import { useState, type ReactNode } from 'react'
import { PAY_PRICE } from '../config/pay'
import { verifyUnlockCode } from '../utils/unlock'
import payQr from '../assets/wechat-pay.png'
import contactQr from '../assets/wechat-contact.png'

interface Props {
  onClose: () => void
  onUnlocked: () => void
}

type PreviewQr = { src: string; title: string }

export function UnlockModal({ onClose, onUnlocked }: Props) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<PreviewQr | null>(null)

  const handleUnlock = async () => {
    setError('')
    setLoading(true)
    try {
      const ok = await verifyUnlockCode(code)
      if (!ok) {
        setError('口令不对，再核对一下吧')
        return
      }
      onUnlocked()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm lg:max-w-lg rounded-2xl bg-white p-5 lg:p-8 shadow-soft max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-800">请开发者喝杯奶茶</h2>
          <div className="shrink-0 text-right leading-none">
            <p className="text-[11px] text-gray-400 mb-1">一杯奶茶</p>
            <p className="text-accent">
              <span className="text-sm font-medium align-top">¥</span>
              <span className="text-2xl font-semibold tracking-tight">{PAY_PRICE}</span>
            </p>
          </div>
        </div>
        <p className="mt-2 lg:mt-3 text-sm lg:text-[15px] text-gray-500 leading-relaxed">
          专属制作，要是喜欢，扫码请我喝杯奶茶，再加微信把截图发我，我回你一串口令。输入后就能下载无水印请柬。有改字、改版等定制需求，也可以加我微信说一声。
        </p>
        <div className="mt-4 lg:mt-6 grid grid-cols-2 gap-3 lg:gap-6">
          <QrThumb
            src={payQr}
            title="扫码请奶茶"
            caption="1. 扫码请奶茶"
            extra={<p className="text-xs font-medium text-accent">¥{PAY_PRICE}</p>}
            onOpen={() => setPreview({ src: payQr, title: '扫码请奶茶' })}
          />
          <QrThumb
            src={contactQr}
            title="加我微信"
            caption="2. 加我微信"
            onOpen={() => setPreview({ src: contactQr, title: '加我微信' })}
          />
        </div>
        <label className="block mt-4 text-sm font-medium text-gray-700 mb-1.5">口令</label>
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="input-modern tracking-widest uppercase"
          placeholder="请输入口令"
          autoCapitalize="characters"
        />
        {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
        <div className="mt-4 flex gap-2">
          <button type="button" className="btn-ghost flex-1" onClick={onClose}>
            取消
          </button>
          <button
            type="button"
            className="btn-primary flex-1"
            disabled={loading || !code.trim()}
            onClick={handleUnlock}
          >
            {loading ? '请稍候...' : '确认'}
          </button>
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex flex-col items-center justify-center p-6"
          onClick={e => {
            e.stopPropagation()
            setPreview(null)
          }}
        >
          <p className="mb-3 text-sm text-white/90">{preview.title}</p>
          <img
            src={preview.src}
            alt={preview.title}
            className="w-[min(86vw,320px)] lg:w-[min(70vw,420px)] aspect-square rounded-2xl bg-white object-contain p-3"
          />
          <p className="mt-3 text-xs text-white/60">再点一下关闭</p>
        </div>
      )}
    </div>
  )
}

function QrThumb({
  src,
  title,
  caption,
  extra,
  onOpen,
}: {
  src: string
  title: string
  caption: string
  extra?: ReactNode
  onOpen: () => void
}) {
  return (
    <div className="text-center">
      <button
        type="button"
        onClick={onOpen}
        className="block w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40"
        aria-label={`点击放大：${title}`}
      >
        <img
          src={src}
          alt={title}
          className="mx-auto w-full max-w-[140px] lg:max-w-[200px] aspect-square rounded-xl border border-gray-100 object-contain bg-gray-50"
        />
      </button>
      <p className="mt-1.5 text-xs text-gray-500">{caption}</p>
      {extra}
      <p className="text-[11px] text-gray-400">点击放大</p>
    </div>
  )
}
