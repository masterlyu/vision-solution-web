'use client'
import { useEffect } from 'react'

export function ChatbotLoader() {
  useEffect(() => {
    const load = () => {
      ;(window as never as { difyChatbotConfig: unknown }).difyChatbotConfig = {
        token: 'PCt1VlRbyvKH4dX3',
        baseUrl: 'https://chatbot.visionc.co.kr',
      }
      const script = document.createElement('script')
      script.src = 'https://chatbot.visionc.co.kr/embed.min.js'
      script.defer = true
      document.body.appendChild(script)
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(load, { timeout: 4000 })
    } else {
      setTimeout(load, 3000)
    }
  }, [])

  return null
}
