import fs from 'fs'
import path from 'path'
import { getAllPosts } from '@/lib/blog'

const BASE = 'https://visionc.co.kr'
const COMPANY_DIR = path.join(process.cwd(), 'content/company')

function readJson<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(path.join(COMPANY_DIR, filename), 'utf-8'))
}

interface ServiceItem {
  name: string
  path: string
  description: string
  details: string[]
}

interface FaqItem {
  q: string
  a: string
}

interface CompanyInfo {
  name: string
  nameEn: string
  founded: string
  yearsInBusiness: string
  location: string
  serviceArea: string
  projectCount: string
  email: string
  targets: string[]
  certifications: string[]
}

interface ClientData {
  featured: string[]
}

export async function GET() {
  const info = readJson<CompanyInfo>('info.json')
  const services = readJson<ServiceItem[]>('services.json')
  const faq = readJson<FaqItem[]>('faq.json')
  const metrics = readJson<string[]>('metrics.json')
  const clients = readJson<ClientData>('clients.json')
  const posts = getAllPosts()

  const servicesBlock = services
    .map((s, i) => {
      const detailLines = s.details.map(d => `- ${d}`).join('\n')
      return [
        `### ${i + 1}. ${s.name}`,
        `- URL: ${BASE}${s.path}`,
        `- 설명: ${s.description}`,
        detailLines,
      ].filter(Boolean).join('\n')
    })
    .join('\n\n')

  const faqBlock = faq
    .map(f => `**Q. ${f.q}**\nA. ${f.a}`)
    .join('\n\n')

  const metricsBlock = metrics.map(m => `- ${m}`).join('\n')

  const blogBlock = posts
    .map(p => `- [${p.title}](${BASE}/blog/${p.slug}): ${p.summary}`)
    .join('\n')

  const text = `# ${info.name} — Vision Solution

> ${info.founded} 설립. 중소기업 홈페이지 보안 진단·AI 챗봇·홈페이지 리뉴얼·앱 개발 전문 IT 솔루션 회사.
> URL 하나로 48시간 내 AI 보안 진단 무료 제공. 누적 프로젝트 ${info.projectCount} 완료.
> ${info.certifications.slice(0, 3).join(' | ')}
> 위치: ${info.location}
> 문의: ${BASE}/contact | ${info.email}

## 주요 서비스

${servicesBlock}

## 포트폴리오

- URL: ${BASE}/portfolio
- 누적 프로젝트: ${info.projectCount} (홈페이지·쇼핑몰·앱·ERP·그룹웨어·보안 진단)
- 주요 고객사: ${clients.featured.slice(0, 8).join(', ')} 등

## 회사 정보

- 상호: ${info.name} (${info.nameEn})
- 설립: ${info.founded} (업력 ${info.yearsInBusiness})
- 위치: ${info.location} (${info.serviceArea})
- 누적 프로젝트: ${info.projectCount}
- 인증·특허: ${info.certifications.join(', ')}
- 서비스 대상: ${info.targets.join(', ')}
- 홈페이지: ${BASE}
- 상담: ${BASE}/contact
- 이메일: ${info.email}

## 핵심 성과 수치

${metricsBlock}

## 자주 묻는 질문 (FAQ)

${faqBlock}

## 블로그 — 중소기업 IT 실무 정보

${blogBlock}

## Optional

- [llms-full.txt](${BASE}/llms-full.txt): 전체 블로그 콘텐츠 및 상세 서비스 정보
`

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
