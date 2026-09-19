/** 注入 public/fonts 下的开源中式字体。只注册 400，加粗走浏览器伪粗，避免 Regular 被标成 700 后看不出变化。 */
export function injectWebFonts() {
  const base = import.meta.env.BASE_URL
  const faces = [
    { family: 'LXGW WenKai Lite', file: 'LXGWWenKaiLite-Regular.ttf' },
    { family: 'LXGW Neo ZhiSong', file: 'LXGWNeoZhiSong.ttf' },
    { family: 'Zhuque Fangsong', file: 'ZhuqueFangsong-Regular.ttf' },
    { family: 'Ma Shan Zheng', file: 'MaShanZheng-Regular.ttf' },
  ]
  const css = faces
    .map(f => `@font-face{font-family:'${f.family}';src:url('${base}fonts/${f.file}') format('truetype');font-weight:400;font-style:normal;font-display:swap;}`)
    .join('')
  const el = document.createElement('style')
  el.setAttribute('data-webfonts', '1')
  el.textContent = css
  document.head.appendChild(el)

  faces.forEach(f => {
    const url = `url(${JSON.stringify(`${base}fonts/${f.file}`)})`
    const face = new FontFace(f.family, url, { weight: '400', style: 'normal' })
    face.load().then(loaded => document.fonts.add(loaded)).catch(() => {})
  })
}

export async function waitWebFonts() {
  try {
    await document.fonts.ready
  } catch {
    /* ignore */
  }
}
