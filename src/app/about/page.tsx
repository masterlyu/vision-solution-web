'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-black mb-6">
        Vision Solution 소개
      </h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-xl">
        중소기업의 디지털 성장을 돕는 웹·AI 솔루션 전문 파트너입니다.<br />
        이 페이지는 곧 업데이트됩니다.
      </p>
      <Button asChild className="rounded-full px-8 h-12">
        <Link href="/contact">무료 진단 신청</Link>
      </Button>
    </main>
  )
}
