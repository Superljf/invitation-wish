import './Watermark.css'

type Props = {
  /** 红底模板用淡金，白底模板用淡红，贴近请柬颜色 */
  variant: 'red' | 'white'
}

/** 浅、细的斜向水印，颜色贴近模板，降低自动去水印识别 */
export function Watermark({ variant }: Props) {
  const marks = []
  for (let i = 0; i < 28; i++) {
    marks.push(
      <span key={i} className="watermark-text">仅供预览</span>
    )
  }
  return (
    <div className={`watermark-overlay watermark-${variant}`} aria-hidden="true">
      <div className="watermark-grid">{marks}</div>
    </div>
  )
}
