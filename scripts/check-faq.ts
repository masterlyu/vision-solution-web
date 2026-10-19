// 실행: npx tsx scripts/check-faq.ts — 블로그 FAQ 추출(FAQPage JSON-LD 원천)이 깨지면 실패한다
import assert from "node:assert/strict"
import { extractFaq, getAllPosts, getPostBySlug } from "../src/lib/blog"

const md = `## 본문\n내용\n\n## 자주 묻는 질문 (FAQ)\n\n**Q. 무료인가요?**  \nA. 네, **기본은** 무료입니다.\n\n### Q. 안전한가요?\n[문서](https://x.y)를 보세요.\n\n---\n\n**Q. 끝난 뒤 질문**\n무시돼야 함`
assert.deepEqual(extractFaq(md), [
  { q: "무료인가요?", a: "네, 기본은 무료입니다." },
  { q: "안전한가요?", a: "문서를 보세요." },
])
assert.deepEqual(extractFaq("## 본문\n**Q. 이건 FAQ 섹션 밖**\n답"), [])

// 실제 글: FAQ 섹션이 있는 글은 전부 질문 2개 이상이 뽑혀야 한다
const misses = getAllPosts()
  .map(p => getPostBySlug(p.slug)!)
  .filter(p => /^#{2,3}\s+(자주 묻는 질문|FAQ)/im.test(p.content) && extractFaq(p.content).length < 2)
  .map(p => p.slug)
assert.deepEqual(misses, [])
console.log("PASS: blog faq")
