#!/usr/bin/env python3
"""
Nemotron Agentic Shim — Paperclip용 ReAct 루프 지원
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Paperclip claude-local 어댑터가 이 스크립트를 Claude CLI 대신 호출.
기존: 텍스트만 생성 (tool use 없음 → checkout/done 불가)
개선: <bash>/<read>/<write>/<done> 태그로 실제 도구 실행 (ReAct 루프)
"""
import sys
import os
import json
import uuid
import re
import subprocess
import argparse

NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY", "")
BASE_URL = "https://integrate.api.nvidia.com/v1"
MODEL = os.environ.get("NEMOTRON_MODEL", "nvidia/nemotron-3-super-120b-a12b")
MAX_TOKENS = int(os.environ.get("NEMOTRON_MAX_TOKENS", "4096"))
TEMPERATURE = float(os.environ.get("NEMOTRON_TEMPERATURE", "0.2"))
MAX_ITER = int(os.environ.get("NEMOTRON_MAX_ITER", "30"))
BASH_TIMEOUT = int(os.environ.get("NEMOTRON_BASH_TIMEOUT", "30"))

# Paperclip 에이전트 공통 시스템 프롬프트 — 도구 사용법 + 핵심 규칙
AGENTIC_SYSTEM = """You are a Paperclip AI agent. Complete tasks by executing tools.

## TOOL FORMAT (one tool per response, then wait for result)

Run a shell command:
<bash>
command here
</bash>

Read a file:
<read>/absolute/path/to/file</read>

Write a file:
<write path="/absolute/path/to/file">
content here
</write>

Signal completion:
<done>brief summary of what was done</done>

## PAPERCLIP API RULES
- Base URL: use $PAPERCLIP_API_URL (default: http://localhost:3100)
- Auth header: Authorization: Bearer $PAPERCLIP_API_KEY
- Run-Id header: X-Paperclip-Run-Id: $PAPERCLIP_RUN_ID  (required on checkout/patch/post)
- ALWAYS checkout before working: POST /api/issues/{id}/checkout
- ALWAYS update status when done: PATCH /api/issues/{id} {"status":"done","comment":"..."}
- If inbox is empty and no @-mention to act on: <done>no work assigned</done>

## KEY ENDPOINTS
- GET  $PAPERCLIP_API_URL/api/agents/me/inbox-lite
- POST $PAPERCLIP_API_URL/api/issues/{id}/checkout  -d '{"agentId":"$PAPERCLIP_AGENT_ID","expectedStatuses":["todo","backlog","blocked"]}'
- GET  $PAPERCLIP_API_URL/api/issues/{id}/heartbeat-context
- GET  $PAPERCLIP_API_URL/api/issues/{id}/comments
- POST $PAPERCLIP_API_URL/api/issues/{id}/comments  -d '{"body":"..."}'
- PATCH $PAPERCLIP_API_URL/api/issues/{id}  -d '{"status":"done","comment":"..."}'

All curl calls: -s -H "Authorization: Bearer $PAPERCLIP_API_KEY" -H "X-Paperclip-Run-Id: $PAPERCLIP_RUN_ID" -H "Content-Type: application/json"
"""


# ── LLM 호출 ────────────────────────────────────────────────────────────────

def call_nemotron(messages: list) -> dict:
    """Multi-turn Nemotron API 호출 — openai SDK 우선, requests 폴백"""
    try:
        from openai import OpenAI
        client = OpenAI(base_url=BASE_URL, api_key=NVIDIA_API_KEY)
        resp = client.chat.completions.create(
            model=MODEL, messages=messages,
            temperature=TEMPERATURE, max_tokens=MAX_TOKENS, timeout=120,
        )
        usage = resp.usage
        return {
            "text": resp.choices[0].message.content or "",
            "input_tokens": getattr(usage, "prompt_tokens", 0) if usage else 0,
            "output_tokens": getattr(usage, "completion_tokens", 0) if usage else 0,
        }
    except ImportError:
        pass

    import requests
    resp = requests.post(
        f"{BASE_URL}/chat/completions",
        headers={"Authorization": f"Bearer {NVIDIA_API_KEY}", "Content-Type": "application/json"},
        json={"model": MODEL, "messages": messages, "temperature": TEMPERATURE, "max_tokens": MAX_TOKENS},
        timeout=120,
    )
    resp.raise_for_status()
    data = resp.json()
    usage = data.get("usage", {})
    return {
        "text": data["choices"][0]["message"]["content"] or "",
        "input_tokens": usage.get("prompt_tokens", 0),
        "output_tokens": usage.get("completion_tokens", 0),
    }


# ── 도구 실행 ────────────────────────────────────────────────────────────────

def exec_bash(cmd: str) -> str:
    try:
        r = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=BASH_TIMEOUT)
        out = r.stdout
        if r.stderr:
            out += f"\n[stderr]: {r.stderr}"
        if r.returncode != 0:
            out += f"\n[exit: {r.returncode}]"
        return (out.strip() or "(no output)")[:5000]
    except subprocess.TimeoutExpired:
        return f"[timeout after {BASH_TIMEOUT}s]"
    except Exception as e:
        return f"[bash error: {e}]"


def exec_read(path: str) -> str:
    try:
        with open(path.strip()) as f:
            return f.read()[:6000]
    except Exception as e:
        return f"[read error: {e}]"


def exec_write(path: str, content: str) -> str:
    try:
        os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
        with open(path.strip(), "w") as f:
            f.write(content)
        return f"[written: {path}]"
    except Exception as e:
        return f"[write error: {e}]"


# ── ReAct 루프 ───────────────────────────────────────────────────────────────

def agentic_loop(prompt: str, extra_system: str = "") -> dict:
    """
    ReAct 루프:
    1. Nemotron에 프롬프트 전달
    2. 응답에서 <bash>/<read>/<write>/<done> 태그 파싱
    3. 도구 실행 후 결과를 다음 메시지로 피드백
    4. <done> 나오거나 MAX_ITER 도달 시 종료
    """
    system = AGENTIC_SYSTEM
    if extra_system:
        system += f"\n\n{extra_system}"

    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": prompt},
    ]

    total_in = total_out = 0
    final_text = "작업 완료"

    for i in range(MAX_ITER):
        result = call_nemotron(messages)
        text = result["text"]
        total_in += result["input_tokens"]
        total_out += result["output_tokens"]

        messages.append({"role": "assistant", "content": text})

        # <done> 태그 — 루프 종료
        done_m = re.search(r"<done>(.*?)</done>", text, re.DOTALL)
        if done_m:
            final_text = done_m.group(1).strip()
            break

        # <bash> 태그
        bash_m = re.search(r"<bash>(.*?)</bash>", text, re.DOTALL)
        if bash_m:
            output = exec_bash(bash_m.group(1).strip())
            messages.append({"role": "user", "content": f"Result:\n{output}\n\nContinue."})
            continue

        # <read> 태그
        read_m = re.search(r"<read>(.*?)</read>", text, re.DOTALL)
        if read_m:
            output = exec_read(read_m.group(1).strip())
            messages.append({"role": "user", "content": f"File content:\n{output}\n\nContinue."})
            continue

        # <write> 태그
        write_m = re.search(r'<write path="([^"]+)">(.*?)</write>', text, re.DOTALL)
        if write_m:
            output = exec_write(write_m.group(1), write_m.group(2))
            messages.append({"role": "user", "content": f"{output}\n\nContinue."})
            continue

        # 태그 없음 — 텍스트만 출력됨 (마지막 반복이면 그대로 사용)
        final_text = text
        if i < MAX_ITER - 1:
            messages.append({
                "role": "user",
                "content": "Use a tool (<bash>, <read>, <write>) or output <done>summary</done> if finished.",
            })

    return {"text": final_text, "input_tokens": total_in, "output_tokens": total_out}


# ── stream-json 출력 ─────────────────────────────────────────────────────────

def emit_stream_json(session_id: str, result: dict):
    """Claude stream-json 호환 형식으로 stdout 출력"""
    print(json.dumps({"type": "system", "subtype": "init", "session_id": session_id, "model": MODEL}), flush=True)
    print(json.dumps({
        "type": "assistant",
        "session_id": session_id,
        "message": {"content": [{"type": "text", "text": result["text"]}]},
    }), flush=True)
    print(json.dumps({
        "type": "result",
        "session_id": session_id,
        "model": MODEL,
        "result": result["text"],
        "usage": {
            "input_tokens": result["input_tokens"],
            "cache_read_input_tokens": 0,
            "output_tokens": result["output_tokens"],
        },
        "total_cost_usd": 0.0,
    }), flush=True)


# ── 엔트리포인트 ─────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Nemotron Agentic Shim for Paperclip")
    # Claude CLI 호환 인자 (무시하지만 에러 안 내도록)
    parser.add_argument("--print", dest="print_mode", nargs="?", const="-", default=None)
    parser.add_argument("--output-format", dest="output_format", default="stream-json")
    parser.add_argument("--verbose", action="store_true")
    parser.add_argument("--dangerously-skip-permissions", action="store_true")
    parser.add_argument("--model", default=None)
    parser.add_argument("--effort", default=None)
    parser.add_argument("--max-turns", default=None)
    parser.add_argument("--resume", default=None)
    parser.add_argument("--append-system-prompt-file", default=None)
    parser.add_argument("--add-dir", default=None)
    parser.add_argument("--chrome", action="store_true")
    parser.add_argument("extra", nargs="*")
    args = parser.parse_args()

    if not NVIDIA_API_KEY:
        print(json.dumps({
            "type": "result",
            "result": "NVIDIA_API_KEY 환경변수가 설정되지 않았습니다.",
            "usage": {"input_tokens": 0, "cache_read_input_tokens": 0, "output_tokens": 0},
            "total_cost_usd": 0.0,
        }))
        sys.exit(1)

    prompt = sys.stdin.read() if not sys.stdin.isatty() else ""
    if not prompt.strip():
        prompt = "Check your inbox and complete any assigned tasks."

    extra_system = ""
    if args.append_system_prompt_file:
        try:
            with open(args.append_system_prompt_file) as f:
                extra_system = f.read()
        except Exception:
            pass

    session_id = args.resume or str(uuid.uuid4())

    try:
        result = agentic_loop(prompt, extra_system)
        emit_stream_json(session_id, result)
    except Exception as e:
        print(json.dumps({
            "type": "result",
            "session_id": session_id,
            "result": f"Shim 실패: {e}",
            "usage": {"input_tokens": 0, "cache_read_input_tokens": 0, "output_tokens": 0},
            "total_cost_usd": 0.0,
        }))
        sys.exit(1)


if __name__ == "__main__":
    main()
