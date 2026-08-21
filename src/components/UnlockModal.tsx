import { useState } from 'react'
import { verifyUnlockCode } from '../utils/unlock'
import payQr from '../assets/wechat-pay.svg'
import contactQr from '../assets/wechat-contact.svg'

interface Props {
  onClose: () => void
  onUnlocked: () => void
}

export function UnlockModal({ onClose, onUnlocked }: Props) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
        className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-soft max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800">请开发者喝杯奶茶</h2>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          专属制作，要是用得顺手，扫码请我喝杯奶茶，再加微信把截图发我，我回你一串口令。输入后本机就能下载无水印请柬。
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="text-center">
            <img
              src={payQr}
              alt="请杯奶茶"
              className="mx-auto w-full max-w-[140px] aspect-square rounded-xl border border-gray-100 object-contain bg-gray-50"
            />
            <p className="mt-1.5 text-xs text-gray-500">1. 扫码请奶茶</p>
          </div>
          <div className="text-center">
            <img
              src={contactQr}
              alt="加我微信"
              className="mx-auto w-full max-w-[140px] aspect-square rounded-xl border border-gray-100 object-contain bg-gray-50"
            />
            <p className="mt-1.5 text-xs text-gray-500">2. 加我微信</p>
          </div>
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
    </div>
  )
}
