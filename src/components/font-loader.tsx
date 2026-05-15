const FONT_URL =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'

export function FontLoader() {
  return (
    <>
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONT_URL} crossOrigin="anonymous" />
    </>
  )
}
