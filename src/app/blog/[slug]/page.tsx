import type { Metadata } from 'next'
import { ClipboardList } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { markdownToHtml, extractHeadings } from '@/lib/markdownToHtml'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

const BASE = 'https://visionc.co.kr'

// 네이버 검색 최적화: meta description은 80자 이내여야 노출이 안정적이고,
// og:description은 meta description과 정확히 일치해야 한다(네이버 서치어드바이저 권고).
// → meta/og/twitter는 80자 이내로 통일하고, 더 긴 설명은 JSON-LD(BlogPosting)가 담아 구글에 제공한다.
function naverDesc(summary: string): string {
  if (summary.length <= 80) return summary
  const win = summary.slice(0, 80)
  // 80자 이내 마지막 문장 끝(. ! ? 。)에서 자연스럽게 끊기
  const sent = win.match(/^[\s\S]*[.!?。]/)
  if (sent && sent[0].length >= 40) return sent[0].trim()
  // 없으면 마지막 공백, 그것도 없으면 하드컷
  const sp = win.lastIndexOf(' ')
  return (sp >= 40 ? win.slice(0, sp) : win).trim()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const url = `${BASE}/blog/${slug}`
  const desc = naverDesc(post.summary)   // meta/og/twitter 공통 (네이버 80자 + 정확 일치)
  // SNS/LLM 공유 미리보기: SVG는 카카오·페북·X가 렌더 못 하므로 PNG(OG 라우트) 사용 — 글 제목·태그 주입
  const ogImage = `${BASE}/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(post.tag)}`
  return {
    title: `${post.title} | (주)비젼솔루션 블로그`,
    description: desc,
    keywords: post.tags.join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: desc,
      type: 'article',
      url,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ['(주)비젼솔루션'],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: desc,
      images: [ogImage],
    },
  }
}

const TAG_COLORS: Record<string, string> = {
  // 파랑 — 리뉴얼
  '리뉴얼 사례':   'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]',
  '리뉴얼 비용':   'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]',
  '홈페이지 리뉴얼': 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]',
  // 빨강 — 보안
  '보안 경고':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안 점검':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안 진단':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '웹 보안':       'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '웹보안':        'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '웹 보안 진단':  'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '중소기업 보안':  'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '홈페이지 보안':  'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '랜섬웨어':      'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '해킹 방지':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '해킹 방어':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '사이버보안':    'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'KISA':          'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'AI공격':        'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안체크리스트': 'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '사기 예방':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안':          'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '다크웹':        'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '사이버 공격':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안 취약점':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'AI 해킹':       'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '모의해킹':      'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '공공기관 보안':  'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '해킹 예방':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'AI 보안':       'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'AI 보안정책':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '침해사고':      'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '홈페이지 해킹':  'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안 헤더':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '취약점':        'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '데이터 보안':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'HTTPS':         'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'ASM':           'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'API 키 관리':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '정보보호':      'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '개인정보 보호': 'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'KISA 무료 지원': 'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '안전진단':      'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '섀도AI':        'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '데이터거버넌스': 'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  // primary — AI · 자동화
  'AI 활용':       'bg-primary/10 text-primary',
  'AI 영상':       'bg-primary/10 text-primary',
  '소라 대안':     'bg-primary/10 text-primary',
  'AI 솔루션':     'bg-primary/10 text-primary',
  'AI 뉴스':       'bg-primary/10 text-primary',
  '중소기업 AI':   'bg-primary/10 text-primary',
  '오픈소스 AI':   'bg-primary/10 text-primary',
  '업무 자동화':   'bg-primary/10 text-primary',
  '무료 AI':       'bg-primary/10 text-primary',
  '소상공인 AI':   'bg-primary/10 text-primary',
  'AI 에이전트':   'bg-primary/10 text-primary',
  '무료 AI 도구':  'bg-primary/10 text-primary',
  'ChatGPT':       'bg-primary/10 text-primary',
  '로컬 AI':       'bg-primary/10 text-primary',
  '챗봇':          'bg-primary/10 text-primary',
  'AI 생산성':     'bg-primary/10 text-primary',
  'AI 도구':       'bg-primary/10 text-primary',
  '오피스 자동화': 'bg-primary/10 text-primary',
  '회의록 자동화': 'bg-primary/10 text-primary',
  '클로드':        'bg-primary/10 text-primary',
  'Gemini':        'bg-primary/10 text-primary',
  'Google Antigravity': 'bg-primary/10 text-primary',
  '구글 AI':       'bg-primary/10 text-primary',
  '생성형 AI':     'bg-primary/10 text-primary',
  '중소기업AI':    'bg-primary/10 text-primary',
  '사내 AI 채팅':  'bg-primary/10 text-primary',
  'Open WebUI':    'bg-primary/10 text-primary',
  'AI 글쓰기':     'bg-primary/10 text-primary',
  'AI홈페이지':    'bg-primary/10 text-primary',
  'AI챗봇':        'bg-primary/10 text-primary',
  'Colibri':       'bg-primary/10 text-primary',
  'GLM-5.2':       'bg-primary/10 text-primary',
  '유튜브 BGM':    'bg-primary/10 text-primary',
  '생성형AI':      'bg-primary/10 text-primary',
  '업무효율':      'bg-primary/10 text-primary',
  '업무자동화':    'bg-primary/10 text-primary',
  'AI 자동화':     'bg-primary/10 text-primary',
  '반복업무 제거': 'bg-primary/10 text-primary',
  '컴퓨터 자동화': 'bg-primary/10 text-primary',
  'DeepSeek':      'bg-primary/10 text-primary',
  'Anthropic':     'bg-primary/10 text-primary',
  'GPT-6':         'bg-primary/10 text-primary',
  '지식관리':      'bg-primary/10 text-primary',
  '구조도 자동화': 'bg-primary/10 text-primary',
  '무료 도구':     'bg-primary/10 text-primary',
  '이미지 생성':   'bg-primary/10 text-primary',
  'Flowise':       'bg-primary/10 text-primary',
  'AI 이미지 편집': 'bg-primary/10 text-primary',
  'SenseNova U1':  'bg-primary/10 text-primary',
  '포토샵 대안':   'bg-primary/10 text-primary',
  // 초록 — 개발
  '개발 팁':       'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '앱 개발':       'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '오픈소스':      'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'SemIf':         'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '바이브코딩':    'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '노코드':        'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'GitHub':        'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'GitHub 트렌딩': 'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  // 앰버 — 홈페이지 · 비즈니스
  '홈페이지 제작': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '유지보수':      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업':      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '소상공인':      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '마이크로소프트': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'SEO':           'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'SEO 최적화':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'SNS 마케팅':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '온라인마케팅':  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '홈페이지 진단': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업 마케팅': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '소상공인 마케팅': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '비용 절감':     'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'AI 비용 절감':  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업 AI 도입': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '경쟁사 분석':   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '마케팅 도구':   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업 지원사업': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '정부 지원':     'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '정부지원사업':  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'GEO':           'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'AEO':           'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '검색최적화':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '디지털전환':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '온라인 쇼핑':   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '매출 자동화':   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '초보자 가이드': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '체크리스트':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '모두의AI':      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '4K 상품 사진':  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '워드프레스 유지보수': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업 홈페이지': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'Wix Symphony':  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '마케팅':        'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '마케팅 AI':     'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '마케팅 자동화': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'SNS 자동화':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'E-E-A-T':       'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '검색엔진최적화': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '광고비용':      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '네이버광고':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '구글 알고리즘': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '구글 코어 업데이트': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '구글 코어업데이트': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '카카오톡 마케팅': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '카카오채널':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  // 빨강 — 보안 추가
  '비밀번호':                    'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  // 초록 — 개발 추가
  '하네스 엔지니어링':               'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '코딩 에이전트':                 'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '개발 비용 절감':                'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '플러그인 업데이트':               'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'Lovable':                 'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'Ollama':                  'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'LM Studio':               'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'LiteLLM':                 'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'OpenCode':                'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'OpenRouter':              'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  // 앰버 — 홈페이지·비즈니스 추가
  '1인 가구':                   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'Core Web Vitals':         'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'ROI':                     'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '계약':                      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '고객 관리 자동화':               'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '고객 응대 자동화':               'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '구글 쇼핑':                   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '구글 플레이':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '데이터 분석':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '도입 사례':                   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '디지털 전환':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '리뷰 관리':                   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '리포트 공개':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '무료 CRM':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '무료 마케팅':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '무료 오피스':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '무료 진단':                   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '브랜드 제작':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '비용 가이드':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '생존신고':                    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '성공 사례':                   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '성과':                      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '성능':                      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '성능 최적화':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '소상공인 지원':                 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '소셜미디어':                   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '시장 조사':                   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '안부 확인':                   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '업체 선택':                   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '엑셀':                      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '엑셀 대체':                   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '외주':                      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '인천 계양구':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '정부 지원사업':                 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업 AI 도구':              'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업 IT':                 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업 자동화':                'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업마케팅':                 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '직원 온보딩':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '해외 거래처':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '홈페이지 관리':                 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '홈페이지 성과':                 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '홈페이지 순위':                 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '홈페이지 최적화':                'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '홍보영상 제작':                 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '회계 자동화':                  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '오픈소스 CRM':                 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  // primary — AI·자동화 추가
  'AI CRM':                  'bg-primary/10 text-primary',
  'AI 교육 플랫폼':               'bg-primary/10 text-primary',
  'AI 도입':                   'bg-primary/10 text-primary',
  'AI 디자인':                  'bg-primary/10 text-primary',
  'AI 모델 선택':                'bg-primary/10 text-primary',
  'AI 분석':                   'bg-primary/10 text-primary',
  'AI 스킬':                   'bg-primary/10 text-primary',
  'AI 앱 빌더':                 'bg-primary/10 text-primary',
  'AI 업무자동화':                'bg-primary/10 text-primary',
  'AI 에이전트 도구':              'bg-primary/10 text-primary',
  'AI 에이전트 메모리':             'bg-primary/10 text-primary',
  'AI 에이전트 프레임워크':           'bg-primary/10 text-primary',
  'AI 영상 생성':                'bg-primary/10 text-primary',
  'AI 워크스페이스':               'bg-primary/10 text-primary',
  'AI 음성':                   'bg-primary/10 text-primary',
  'AI 정책':                   'bg-primary/10 text-primary',
  'AI 지원':                   'bg-primary/10 text-primary',
  'AI 직원교육':                 'bg-primary/10 text-primary',
  'AI 챗봇':                   'bg-primary/10 text-primary',
  'AI 코딩':                   'bg-primary/10 text-primary',
  'AI 통합':                   'bg-primary/10 text-primary',
  'AI 팀원':                   'bg-primary/10 text-primary',
  'AI 환각':                   'bg-primary/10 text-primary',
  'AI 훈련':                   'bg-primary/10 text-primary',
  'AI도입':                    'bg-primary/10 text-primary',
  'AI비용절감':                  'bg-primary/10 text-primary',
  'AI성공전략':                  'bg-primary/10 text-primary',
  'AI에이전트':                  'bg-primary/10 text-primary',
  'Agency Agents':           'bg-primary/10 text-primary',
  'Agent-Reach':             'bg-primary/10 text-primary',
  'Antigravity':             'bg-primary/10 text-primary',
  'Browser-Use':             'bg-primary/10 text-primary',
  'CS 자동화':                  'bg-primary/10 text-primary',
  'CapCut 대안':               'bg-primary/10 text-primary',
  'Cerebras':                'bg-primary/10 text-primary',
  'ChatGPT Flow':            'bg-primary/10 text-primary',
  'ChatGPT 검증':              'bg-primary/10 text-primary',
  'ChatGPT 대안':              'bg-primary/10 text-primary',
  'ChatGPT 업무활용':            'bg-primary/10 text-primary',
  'ChatGPT 자동화':             'bg-primary/10 text-primary',
  'ChatGPT 활용':              'bg-primary/10 text-primary',
  'Claude':                  'bg-primary/10 text-primary',
  'Claude 활용':               'bg-primary/10 text-primary',
  'Cloudflare OS':           'bg-primary/10 text-primary',
  'Dify':                    'bg-primary/10 text-primary',
  'ElevenLabs 대안':           'bg-primary/10 text-primary',
  'FLUX 3':                  'bg-primary/10 text-primary',
  'GLM':                     'bg-primary/10 text-primary',
  'GPT-5.6':                 'bg-primary/10 text-primary',
  'GPT-Live':                'bg-primary/10 text-primary',
  'Gemini Omni':             'bg-primary/10 text-primary',
  'Google AI Studio':        'bg-primary/10 text-primary',
  'Google I/O':              'bg-primary/10 text-primary',
  'Grok 4.6':                'bg-primary/10 text-primary',
  'Grok Bot':                'bg-primary/10 text-primary',
  'HyperFrames':             'bg-primary/10 text-primary',
  'MarkItDown':              'bg-primary/10 text-primary',
  'Microsoft 365':           'bg-primary/10 text-primary',
  'Microsoft Build 2026':    'bg-primary/10 text-primary',
  'MiniMax':                 'bg-primary/10 text-primary',
  'NotebookLM':              'bg-primary/10 text-primary',
  'OCR':                     'bg-primary/10 text-primary',
  'Odysseus':                'bg-primary/10 text-primary',
  'OfficeCLI':               'bg-primary/10 text-primary',
  'OpenMAIC':                'bg-primary/10 text-primary',
  'Ox Alpha':                'bg-primary/10 text-primary',
  'PDF 변환':                  'bg-primary/10 text-primary',
  'PDF 분석':                  'bg-primary/10 text-primary',
  'Prime Agent':             'bg-primary/10 text-primary',
  'Qwen':                    'bg-primary/10 text-primary',
  'Seedance':                'bg-primary/10 text-primary',
  'TencentDB Agent Memory':  'bg-primary/10 text-primary',
  'UI 디자인':                  'bg-primary/10 text-primary',
  'WWDC':                    'bg-primary/10 text-primary',
  'Zapier 대안':               'bg-primary/10 text-primary',
  'anydoc':                  'bg-primary/10 text-primary',
  'iOS 27':                  'bg-primary/10 text-primary',
  'xAI':                     'bg-primary/10 text-primary',
  '구글 Gemini':               'bg-primary/10 text-primary',
  '구글 문서 자동화':               'bg-primary/10 text-primary',
  '구글 스프레드시트':               'bg-primary/10 text-primary',
  '내부망 AI':                  'bg-primary/10 text-primary',
  '딥씨크':                     'bg-primary/10 text-primary',
  '메타 AI':                   'bg-primary/10 text-primary',
  '모두의 AI':                  'bg-primary/10 text-primary',
  '무료 AI 모델':                'bg-primary/10 text-primary',
  '무료 AI 비서':                'bg-primary/10 text-primary',
  '무료 AI 서비스':               'bg-primary/10 text-primary',
  '무료 AI 팀':                 'bg-primary/10 text-primary',
  '무료 TTS':                  'bg-primary/10 text-primary',
  '무료 영상 제작':                'bg-primary/10 text-primary',
  '무료AI':                    'bg-primary/10 text-primary',
  '문서 AI':                   'bg-primary/10 text-primary',
  '문서 변환':                   'bg-primary/10 text-primary',
  '문서 분석':                   'bg-primary/10 text-primary',
  '문서 요약':                   'bg-primary/10 text-primary',
  '문서변환':                    'bg-primary/10 text-primary',
  '반복업무 자동화':                'bg-primary/10 text-primary',
  '봇시팅':                     'bg-primary/10 text-primary',
  '사무 자동화':                  'bg-primary/10 text-primary',
  '생산성':                     'bg-primary/10 text-primary',
  '샤오미 MiMo':                'bg-primary/10 text-primary',
  '설치 가이드':                  'bg-primary/10 text-primary',
  '스마트폰':                    'bg-primary/10 text-primary',
  '스마트폰 AI':                 'bg-primary/10 text-primary',
  '슬랙 자동화':                  'bg-primary/10 text-primary',
  '실시간 AI':                  'bg-primary/10 text-primary',
  '실시간 AI 코칭':               'bg-primary/10 text-primary',
  '실시간 통역':                  'bg-primary/10 text-primary',
  '아웃룩 AI':                  'bg-primary/10 text-primary',
  '알리바바 AI':                 'bg-primary/10 text-primary',
  '앤스로픽':                    'bg-primary/10 text-primary',
  '업무 효율화':                  'bg-primary/10 text-primary',
  '에이전트 AI':                 'bg-primary/10 text-primary',
  '에이전트 스킬':                 'bg-primary/10 text-primary',
  '에이전틱':                    'bg-primary/10 text-primary',
  '엑셀 자동화':                  'bg-primary/10 text-primary',
  '엔비디아':                    'bg-primary/10 text-primary',
  '엣지 AI':                   'bg-primary/10 text-primary',
  '영상 번역':                   'bg-primary/10 text-primary',
  '영상 자동화':                  'bg-primary/10 text-primary',
  '영상 제작':                   'bg-primary/10 text-primary',
  '영상 편집':                   'bg-primary/10 text-primary',
  '영수증 정리':                  'bg-primary/10 text-primary',
  '영업 자동화':                  'bg-primary/10 text-primary',
  '오프라인 AI':                 'bg-primary/10 text-primary',
  '오픈소스AI':                  'bg-primary/10 text-primary',
  '오피스 비서':                  'bg-primary/10 text-primary',
  '온디바이스 AI':                'bg-primary/10 text-primary',
  '윈도우 AI':                  'bg-primary/10 text-primary',
  '유튜브 AI':                  'bg-primary/10 text-primary',
  '음성 복제':                   'bg-primary/10 text-primary',
  '음성 자동화':                  'bg-primary/10 text-primary',
  '음성 합성':                   'bg-primary/10 text-primary',
  '이메일 AI':                  'bg-primary/10 text-primary',
  '이메일 자동화':                 'bg-primary/10 text-primary',
  '이미지 분석':                  'bg-primary/10 text-primary',
  '이미지 생성 AI':               'bg-primary/10 text-primary',
  '인스타그램 AI':                'bg-primary/10 text-primary',
  '자기학습 AI':                 'bg-primary/10 text-primary',
  '전화 자동화':                  'bg-primary/10 text-primary',
  '제미나이':                    'bg-primary/10 text-primary',
  '챗GPT 대안':                 'bg-primary/10 text-primary',
  '초고속 AI':                  'bg-primary/10 text-primary',
  '초보자':                     'bg-primary/10 text-primary',
  '클로드 활용':                  'bg-primary/10 text-primary',
  '클로바X':                    'bg-primary/10 text-primary',
  '토큰 절약':                   'bg-primary/10 text-primary',
  '허깅페이스':                   'bg-primary/10 text-primary',
  '목소리 복제':                  'bg-primary/10 text-primary',
  '비즈니스 AI':                  'bg-primary/10 text-primary',
}

function tagClass(tag: string) {
  return TAG_COLORS[tag] ?? 'bg-primary/10 text-primary'
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const contentHtml = markdownToHtml(post.content)
  const headings = extractHeadings(post.content)
  const readingMinutes = Math.max(1, Math.round(post.content.split(/\s+/).length / 250))

  // Get related posts (same tag, excluding current)
  const allPosts = getAllPosts()
  const related = allPosts.filter(p => p.slug !== slug && p.tag === post.tag).slice(0, 2)

  const pageUrl = `${BASE}/blog/${slug}`
  const imageUrl = post.image ? `${BASE}${post.image}` : `${BASE}/api/og`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    author: {
      '@type': 'Organization',
      name: '(주)비젼솔루션',
      url: BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: '(주)비젼솔루션',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    url: pageUrl,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: BASE },
      { '@type': 'ListItem', position: 2, name: '블로그', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
    ],
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-[800px] mx-auto px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground flex items-center gap-2">
          <Link href="/blog" className="hover:text-foreground transition-colors">블로그</Link>
          <span>/</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${tagClass(post.tag)}`}>{post.tag}</span>
        </nav>

        {/* Hero Image */}
        {post.image && (
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-10 bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              unoptimized={post.image.endsWith('.svg')}
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
              priority
            />
          </div>
        )}

        {/* Post Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <time dateTime={post.date}>{post.date}</time>
            <span>·</span>
            <span>(주)비젼솔루션</span>
            <span>·</span>
            <span>약 {readingMinutes}분</span>
          </div>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map(t => (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(t)}`}
                  className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">
            {post.summary}
          </p>
        </header>

        {/* Table of Contents */}
        {headings.length > 0 && (
          <details
            className="mb-10 bg-muted/40 border border-border rounded-xl overflow-hidden"
            open
          >
            <summary className="cursor-pointer px-6 py-4 font-bold text-foreground text-sm flex items-center justify-between select-none list-none">
              <span><ClipboardList className="inline h-4 w-4 mr-1.5" />목차</span>
              <span className="text-xs text-muted-foreground font-normal">클릭하여 접기/펼치기</span>
            </summary>
            <ol className="px-6 pb-5 pt-1 space-y-2">
              {headings.map((h, idx) => (
                <li key={h.id} className="flex items-start gap-2.5 text-sm">
                  <span className="text-primary font-bold shrink-0">{idx + 1}.</span>
                  <a
                    href={`#${h.id}`}
                    className="text-foreground/80 hover:text-primary transition-colors leading-snug"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        )}

        {/* Post Content */}
        <article
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* CTA Section — auto-inserted */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
          <h2 className="text-xl md:text-2xl font-black text-foreground mb-3">
            우리 회사도 이렇게 할 수 있을까요?
          </h2>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            무료 상담을 통해 현재 상황에 맞는 솔루션을 제안해드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-primary text-primary-foreground font-bold px-7 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              무료 상담 신청
            </Link>
            <Link
              href="/blog"
              className="inline-block border border-border text-foreground font-semibold px-7 py-3 rounded-xl hover:bg-muted transition-colors"
            >
              다른 글 보기
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-bold text-foreground mb-6">관련 글</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all duration-200 group"
                >
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagClass(p.tag)}`}>{p.tag}</span>
                  <h4 className="mt-3 text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="text-muted-foreground text-sm hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← 블로그 목록
          </Link>
        </div>

      </div>
    </div>
  )
}
