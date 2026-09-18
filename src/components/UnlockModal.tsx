import { useState, type ReactNode } from 'react'
import { AFDIAN_ITEM_URL, AFDIAN_PRICE, PAY_PRICE } from '../config/pay'
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
  const [unlockedHint, setUnlockedHint] = useState(false)

  const handleUnlock = async () => {
    setError('')
    setLoading(true)
    try {
      const ok = await verifyUnlockCode(code)
      if (!ok) {
        setError('口令不对，再核对一下吧')
        return
      }
      setUnlockedHint(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={unlockedHint ? undefined : onClose}
    >
      <div
        className="w-full max-w-sm lg:max-w-lg rounded-2xl bg-white p-5 lg:p-8 shadow-soft max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {unlockedHint ? (
          <>
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">解锁成功</h2>
            <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm lg:text-[15px] text-rose-800 leading-relaxed">
              口令请自己留着，不要发给别人。
              <br />
              一旦外传、多人使用，口令会失效，请柬也会重新带上水印。
            </div>
            <p className="mt-3 text-sm text-gray-500">现在可以下载无水印请柬了。</p>
            <button type="button" className="btn-primary w-full mt-5" onClick={onUnlocked}>
              我知道了
            </button>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800">请开发者喝杯奶茶</h2>
              <div className="shrink-0 text-right leading-none">
                <p className="text-[11px] text-gray-400 mb-1">一杯奶茶</p>
                <p className="text-accent whitespace-nowrap">
                  <span className="text-sm font-medium align-top">¥</span>
                  <span className="text-xl font-semibold tracking-tight">{PAY_PRICE}</span>
                </p>
              </div>
            </div>
            <p className="mt-2 lg:mt-3 text-sm lg:text-[15px] text-gray-500 leading-relaxed">
              推荐走爱发电。微信里请直接点下面按钮，不要从相册扫码。
            </p>
            <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-3 text-xs lg:text-sm text-gray-600 leading-relaxed">
              爱发电是创作者常用的收款平台，付款走微信 / 支付宝官方通道。
              <br />
              不用加我微信，也不用事先注册，付的时候验证手机号即可。
              <br />
              付完平台会发私信口令，填到本页就能下载无水印原图。
            </div>
            <a
              href={AFDIAN_ITEM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 lg:mt-5 w-full inline-flex items-center justify-center text-center no-underline"
            >
              去爱发电付款 ¥{AFDIAN_PRICE}
            </a>
            <p className="mt-4 text-xs text-gray-400">也可以扫微信。收款码不会自动发口令，截图加微信后我回你。</p>
            <div className="mt-2 lg:mt-3 grid grid-cols-2 gap-3 lg:gap-6">
              <QrThumb
                src={payQr}
                title="扫码请奶茶"
                caption="微信收款"
                extra={<p className="text-xs font-medium text-accent">¥{PAY_PRICE}</p>}
                onOpen={() => setPreview({ src: payQr, title: '扫码请奶茶' })}
              />
              <QrThumb
                src={contactQr}
                title="加我微信"
                caption="加微信（改版定制）"
                onOpen={() => setPreview({ src: contactQr, title: '加我微信' })}
              />
            </div>
            <label className="block mt-4 text-sm font-medium text-gray-700 mb-1.5">口令</label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="input-modern tracking-widest uppercase"
              placeholder="请输入专属口令"
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
          </>
        )}
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
