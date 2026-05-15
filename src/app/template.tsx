import Script from 'next/script'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script src="/api/gtm-proxy" strategy="afterInteractive" />
      <Script src="/gtag-init.js" strategy="afterInteractive" />
    </>
  )
}
