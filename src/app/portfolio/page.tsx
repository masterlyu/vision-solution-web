'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PortfolioPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-black mb-6">
        포트폴리오
      </h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-xl">
        Vision Solution이 함께한 프로젝트들을 소개합니다.<br />
        이 페이지는 곧 업데이트됩니다.
      </p>
      <Button asChild className="rounded-full px-8 h-12">
        <Link href="/contact">무료 진단 신청</Link>
      </Button>
    </main>
  )
}
