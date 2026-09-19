/** 注入 public/fonts 下的开源中式字体 */
export function injectWebFonts() {
  const base = import.meta.env.BASE_URL
  const faces = [
    { family: 'LXGW WenKai Lite', file: 'LXGWWenKaiLite-Regular.ttf' },
    { family: 'LXGW Neo ZhiSong', file: 'LXGWNeoZhiSong.ttf' },
    { family: 'Zhuque Fangsong', file: 'ZhuqueFangsong-Regular.ttf' },
    { family: 'Ma Shan Zheng', file: 'MaShanZheng-Regular.ttf' },
  ]
  const css = faces
    .flatMap(f => {
      const src = `url('${base}fonts/${f.file}') format('truetype')`
      return [
        `@font-face{font-family:'${f.family}';src:${src};font-weight:400;font-style:normal;font-display:swap;}`,
        `@font-face{font-family:'${f.family}';src:${src};font-weight:700;font-style:normal;font-display:swap;}`,
      ]
    })
    .join('')
  const el = document.createElement('style')
  el.setAttribute('data-webfonts', '1')
  el.textContent = css
  document.head.appendChild(el)

  faces.forEach(f => {
    const url = `url(${JSON.stringify(`${base}fonts/${f.file}`)})`
    ;(['400', '700'] as const).forEach(weight => {
      const face = new FontFace(f.family, url, { weight, style: 'normal' })
      face.load().then(loaded => document.fonts.add(loaded)).catch(() => {})
    })
  })
}

export async function waitWebFonts() {
  try {
    await document.fonts.ready
  } catch {
    /* ignore */
  }
}
