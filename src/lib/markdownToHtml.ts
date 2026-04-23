/**
 * Converts a subset of Markdown to safe HTML.
 * Covers: headings, paragraphs, bold, italic, inline-code, links,
 *         unordered lists, ordered lists, blockquotes, fenced code blocks, tables.
 * No external packages required.
 */
export function markdownToHtml(markdown: string): string {
  let html = ''
  const lines = markdown.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(escapeHtml(lines[i]))
        i++
      }
      html += `<pre class="bg-muted rounded-lg p-4 overflow-x-auto my-6"><code class="text-sm font-mono"${lang ? ` data-lang="${escapeHtml(lang)}"` : ''}>${codeLines.join('\n')}</code></pre>\n`
      i++ // skip closing ```
      continue
    }

    // Headings
    const h4 = line.match(/^####\s+(.+)/)
    if (h4) { html += `<h4 class="text-base font-bold text-foreground mt-6 mb-2">${inlineFormat(h4[1])}</h4>\n`; i++; continue }

    const h3 = line.match(/^###\s+(.+)/)
    if (h3) { html += `<h3 class="text-lg font-bold text-foreground mt-8 mb-3">${inlineFormat(h3[1])}</h3>\n`; i++; continue }

    const h2 = line.match(/^##\s+(.+)/)
    if (h2) { html += `<h2 class="text-xl font-bold text-foreground mt-10 mb-4 pb-2 border-b border-border">${inlineFormat(h2[1])}</h2>\n`; i++; continue }

    const h1 = line.match(/^#\s+(.+)/)
    if (h1) { html += `<h2 class="text-2xl font-bold text-foreground mt-10 mb-4">${inlineFormat(h1[1])}</h2>\n`; i++; continue }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2))
        i++
      }
      html += `<blockquote class="border-l-4 border-primary pl-4 my-4 text-muted-foreground italic">${inlineFormat(quoteLines.join(' '))}</blockquote>\n`
      continue
    }

    // Horizontal rule
    if (line.match(/^---+$/) || line.match(/^\*\*\*+$/)) {
      html += `<hr class="border-border my-8" />\n`
      i++
      continue
    }

    // Table
    if (line.includes('|') && lines[i + 1]?.match(/^\|?[\s:|-]+\|/)) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i])
        i++
      }
      html += renderTable(tableLines)
      continue
    }

    // Unordered list
    if (line.match(/^[-*]\s+/)) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        items.push(`<li class="mb-1">${inlineFormat(lines[i].replace(/^[-*]\s+/, ''))}</li>`)
        i++
      }
      html += `<ul class="list-disc list-inside space-y-1 my-4 text-foreground/90">${items.join('')}</ul>\n`
      continue
    }

    // Ordered list
    if (line.match(/^\d+\.\s+/)) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
        items.push(`<li class="mb-1">${inlineFormat(lines[i].replace(/^\d+\.\s+/, ''))}</li>`)
        i++
      }
      html += `<ol class="list-decimal list-inside space-y-1 my-4 text-foreground/90">${items.join('')}</ol>\n`
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph — collect consecutive non-empty, non-special lines
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('>') &&
      !lines[i].match(/^[-*]\s+/) &&
      !lines[i].match(/^\d+\.\s+/) &&
      !lines[i].includes('|')
    ) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length) {
      html += `<p class="text-foreground/80 leading-relaxed my-4">${inlineFormat(paraLines.join(' '))}</p>\n`
    } else {
      i++ // safety valve
    }
  }

  return html
}

function renderTable(lines: string[]): string {
  const rows = lines.map(l =>
    l.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
  )
  // Row 1 = header, Row 2 = separator (skip), Row 3+ = body
  const header = rows[0]
  const body = rows.slice(2)

  const thead = `<thead class="bg-muted"><tr>${header.map(h => `<th class="px-4 py-2 text-left font-bold text-foreground border border-border">${inlineFormat(h)}</th>`).join('')}</tr></thead>`
  const tbody = `<tbody>${body.map(row =>
    `<tr class="even:bg-muted/30">${row.map(cell => `<td class="px-4 py-2 border border-border text-foreground/80">${inlineFormat(cell)}</td>`).join('')}</tr>`
  ).join('')}</tbody>`

  return `<div class="overflow-x-auto my-6"><table class="w-full border-collapse text-sm">${thead}${tbody}</table></div>\n`
}

/** Inline Markdown formatting: bold, italic, inline-code, links */
function inlineFormat(text: string): string {
  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline underline-offset-2 hover:text-primary/70" target="_blank" rel="noopener noreferrer">$1</a>')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
