'use client'

import { useRef, useEffect } from 'react'

interface MascotVideoProps {
  src: string
  className?: string
  pauseSeconds?: number
}

export default function MascotVideo({ src, className, pauseSeconds = 3 }: MascotVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const onEnded = () => {
      setTimeout(() => {
        video.currentTime = 0
        video.play()
      }, pauseSeconds * 1000)
    }

    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [pauseSeconds])

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      playsInline
      className={className}
    />
  )
}
