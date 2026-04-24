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
