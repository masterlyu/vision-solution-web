'use client'
import { useEffect } from 'react'

const FONT_URL =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'

export function FontLoader() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_URL}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.crossOrigin = 'anonymous'
    link.href = FONT_URL
    document.head.appendChild(link)
  }, [])
  return null
}
