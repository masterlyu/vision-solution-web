import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string
  title: string
  date: string
  tag: string
  tags: string[]
  image: string
  summary: string
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

/** Simple YAML frontmatter parser — no external packages needed */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (key) data[key] = val
  }

  return { data, content: match[2].trim() }
}

export function getAllPosts(): Omit<BlogPost, 'content'>[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))

  return files
    .map(file => {
      const slug = file.replace(/\.(mdx?|md)$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const { data } = parseFrontmatter(raw)
      const tag = data.tag ?? ''
      const tags = data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : (tag ? [tag] : [])
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        tag,
        tags,
        image: data.image ?? '',
        summary: data.summary ?? '',
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const candidates = [`${slug}.md`, `${slug}.mdx`]
  for (const filename of candidates) {
    const filePath = path.join(BLOG_DIR, filename)
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = parseFrontmatter(raw)
      const tag = data.tag ?? ''
      const tags = data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : (tag ? [tag] : [])
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        tag,
        tags,
        image: data.image ?? '',
        summary: data.summary ?? '',
        content,
      }
    }
  }
  return null
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = Array.from(new Set(posts.map(p => p.tag).filter(Boolean)))
  return tags.sort()
}

export interface FaqItem {
  q: string
  a: string
}

/**
 * 본문의 "## 자주 묻는 질문"(또는 FAQ) 섹션에서 질문·답을 뽑는다 — FAQPage JSON-LD 용.
 * 화면에 보이는 글을 그대로 옮기므로 JSON-LD 와 가시 텍스트가 어긋나지 않는다.
 * 질문 형식: `**Q. …**` / `### Q. …` / FAQ 섹션 아래 하위 제목. 답: 다음 질문 전까지(앞의 "A." 제거).
 * 섹션은 같은 급 이상 제목이나 `---` 에서 끝난다.
 */
export function extractFaq(md: string): FaqItem[] {
  const lines = md.split('\n')
  const start = lines.findIndex(l => /^#{2,3}\s+(자주 묻는 질문|FAQ)/i.test(l))
  if (start < 0) return []
  const level = lines[start].match(/^#+/)![0].length
  const clean = (s: string) => s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*|__|`/g, '')
    .replace(/^\s*A\s*\d*\s*[.:)]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()
  const out: FaqItem[] = []
  let q: string | null = null
  let a: string[] = []
  const flush = () => {
    const ans = clean(a.join(' '))
    if (q && ans) out.push({ q, a: ans })
    q = null
    a = []
  }
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i]
    const h = l.match(/^(#+)\s+(.*)/)
    if (h && h[1].length <= level) break
    if (/^---\s*$/.test(l)) break
    const qm = l.match(/^\s*(?:#{3,4}\s*|\*\*)\s*Q\s*\d*\s*[.:)]\s*(.+?)\s*(?:\*\*)?\s*$/)
    const qText = qm ? qm[1] : (h && h[1].length > level ? h[2] : null)
    if (qText) { flush(); q = clean(qText); continue }
    if (q && l.trim() && !/^>/.test(l)) a.push(l)
  }
  flush()
  return out
}
