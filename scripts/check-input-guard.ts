// 실행: npx tsx scripts/check-input-guard.ts — 공개 폼 입력 검사 규칙이 깨지면 실패한다
import assert from "node:assert/strict"
import { escapeHtml, isEmail, isFreeMail, textField } from "../src/lib/inputGuard"

assert.equal(escapeHtml("예산 <500만원 & \"급\""), "예산 &lt;500만원 &amp; &quot;급&quot;")
assert.ok(isEmail("info@company.co.kr"))
for (const bad of ["a@b", "a b@c.com", "<x>@c.com", "a@c.com,b@d.com", 123, "x".repeat(250) + "@c.com"]) assert.ok(!isEmail(bad), String(bad))
assert.ok(isFreeMail("someone@NAVER.com") && isFreeMail("x@gmail.com") && isFreeMail("x@hanmail.net"))
assert.ok(!isFreeMail("info@visionc.co.kr"))
assert.equal(textField("  홍길동 ", 1, 100), "홍길동")
assert.equal(textField("", 1, 100), null)
assert.equal(textField(undefined, 0, 100), "")
assert.equal(textField("x".repeat(101), 1, 100), null)
assert.equal(textField({}, 0, 100), null)
console.log("PASS: input guard")
