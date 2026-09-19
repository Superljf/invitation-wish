import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { EditorForm } from './components/EditorForm'
import { Preview, TEMPLATE_LABEL, type TemplateId } from './components/Preview'
import { Watermark } from './components/Watermark'
import { UnlockModal } from './components/UnlockModal'
import { mergeFormData, type FormData } from './types/formData'
import { downloadNodeAsPng, isWeChat } from './utils/downloadImage'
import { consumeFreeDownload, hydrateFreeUsed, loadUnlocked, remainingFree, saveUnlocked } from './utils/unlock'
// import {
//   saveInvitation,
//   getInvitation,
//   getAllInvitations,
//   type InvitationResponse,
// } from './api/invitation'

const STORAGE_KEY = 'invitation-form-data'
const TEMPLATE_KEY = 'invitation-template-v2'

function loadFormData(): FormData {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (s) {
      return mergeFormData(JSON.parse(s) as Partial<FormData>)
    }
  } catch (_e) {
    /* ignore */
  }
  return mergeFormData()
}

function loadTemplate(): TemplateId {
  try {
    const t = localStorage.getItem(TEMPLATE_KEY)
    if (['1', '2', '3', '4', '5', '6', '8', '11'].includes(t || '')) return Number(t) as TemplateId
  } catch (_e) {
    /* ignore */
  }
  return 5
}

function App() {
  const [formData, setFormData] = useState<FormData>(loadFormData)
  const [templateId, setTemplateId] = useState<TemplateId>(loadTemplate)
  // const [savedId, setSavedId] = useState<string | null>(null)
  // const [saveStatus, setSaveStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  // const [listOpen, setListOpen] = useState(false)
  // const [list, setList] = useState<InvitationResponse[]>([])
  // const [listLoading, setListLoading] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'err'>('idle')
  const [wechatImage, setWechatImage] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(loadUnlocked)
  const [quotaReady, setQuotaReady] = useState(false)
  const [freeUsed, setFreeUsed] = useState(10)
  const [payOpen, setPayOpen] = useState(false)
  const [hideMark, setHideMark] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const freeLeft = remainingFree(freeUsed)
  const canOriginal = unlocked || (quotaReady && freeLeft > 0)

  // useEffect(() => {
  //   const id = new URLSearchParams(location.search).get('id')
  //   if (id) {
  //     getInvitation(id).then(res => {
  //       if (res) {
  //         setFormData(mergeFormData(res.formData))
  //         setTemplateId(res.templateId as TemplateId)
  //       }
  //     }).catch(() => {})
  //   }
  // }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, String(templateId))
  }, [templateId])

  useEffect(() => {
    let alive = true
    hydrateFreeUsed().then(n => {
      if (!alive) return
      setFreeUsed(n)
      setQuotaReady(true)
    })
    return () => {
      alive = false
    }
  }, [])

  // const handleSave = async () => {
  //   setSaveStatus('loading')
  //   try {
  //     const { id } = await saveInvitation(formData, templateId)
  //     setSavedId(id)
  //     setSaveStatus('ok')
  //   } catch {
  //     setSaveStatus('err')
  //   }
  // }

  // const handleCopyLink = () => {
  //   const url = `${location.origin}${location.pathname}?id=${savedId}`
  //   navigator.clipboard.writeText(url)
  // }

  // const handleLoadList = () => {
  //   if (!listOpen && list.length === 0) {
  //     setListLoading(true)
  //     getAllInvitations().then(data => {
  //       setList(data)
  //       setListLoading(false)
  //     }).catch(() => setListLoading(false))
  //   }
  //   setListOpen(!listOpen)
  // }

  // const handleSelectInvitation = (item: InvitationResponse) => {
  //   setFormData(mergeFormData(item.formData))
  //   setTemplateId(item.templateId as TemplateId)
  //   setListOpen(false)
  // }

  const handleDownload = async () => {
    if (!previewRef.current) return
    const originalThisTime = canOriginal
    setDownloadStatus('loading')
    try {
      if (originalThisTime && !unlocked) {
        flushSync(() => setHideMark(true))
        await new Promise<void>(resolve => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        })
      }
      const filename = `请柬-${formData.groom}-${formData.bride}.jpg`
      const wechatUrl = await downloadNodeAsPng(previewRef.current, filename)
      if (wechatUrl) setWechatImage(wechatUrl)
      if (originalThisTime && !unlocked) {
        setFreeUsed(await consumeFreeDownload())
      }
      setDownloadStatus('idle')
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') {
        setDownloadStatus('idle')
        return
      }
      console.error('下载请柬图片失败', e)
      setDownloadStatus('err')
    } finally {
      setHideMark(false)
    }
  }

  const handleUnlocked = () => {
    saveUnlocked()
    setUnlocked(true)
    setPayOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
      <header className="hidden lg:block sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm">
        <div className="px-4 sm:px-6 py-4">
          <h1 className="font-display italic text-[1.75rem] font-medium leading-none text-gray-800 tracking-wide">
            Hong Tie
          </h1>
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.32em] text-gray-400">
            The Red Card
          </p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row lg:min-h-[calc(100vh-72px)] gap-4 lg:gap-6 p-4 sm:p-6 pb-24 lg:pb-6">
        <aside className="lg:w-[400px] shrink-0 flex flex-col">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-gray-100 p-5 sm:p-6 overflow-y-auto flex-1">
            <section className="mb-6">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">模板风格</p>
              <div className="flex flex-wrap gap-2">
                {([5, 1, 2, 3, 4, 6, 8, 11] as const).map(id => (
                  <button
                    key={id}
                    onClick={() => setTemplateId(id)}
                    className={`chip ${
                      templateId === id
                        ? 'bg-accent text-white shadow-glow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {TEMPLATE_LABEL[id]}
                  </button>
                ))}
              </div>
            </section>

            {/* 云端操作暂时关闭
            <section className="mb-6">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">云端操作</p>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saveStatus === 'loading'}
                  className="btn-primary flex-1"
                >
                  {saveStatus === 'loading' ? '保存中...' : '保存到云端'}
                </button>
                <button
                  onClick={handleLoadList}
                  className="btn-ghost"
                >
                  {listOpen ? '收起' : '请柬列表'}
                </button>
              </div>
            </section>

            {saveStatus === 'ok' && savedId && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/60">
                <p className="text-sm font-medium text-emerald-800 mb-2">✓ 保存成功，分享链接</p>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={`${location.origin}${location.pathname}?id=${savedId}`}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-emerald-200 bg-white"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="btn-primary text-xs px-3 py-2"
                  >
                    复制
                  </button>
                </div>
              </div>
            )}
            {saveStatus === 'err' && (
              <p className="mb-6 text-sm text-rose-600">保存失败，请检查后端是否启动</p>
            )}

            {listOpen && (
              <div className="mb-6 max-h-48 overflow-auto rounded-xl border border-gray-200/80 bg-gray-50/50">
                {listLoading ? (
                  <p className="p-4 text-sm text-gray-500">加载中...</p>
                ) : list.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500">暂无请柬</p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {list.map(item => (
                      <li
                        key={item.id}
                        onClick={() => handleSelectInvitation(item)}
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-white/80 transition-colors"
                      >
                        {item.formData.groom} & {item.formData.bride} · {item.formData.solarDate}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            */}

            <section>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">编辑内容</p>
              <EditorForm data={formData} onChange={setFormData} />
            </section>
          </div>
        </aside>

        <main className="flex-1 flex justify-center items-start p-4 sm:p-6 overflow-auto min-h-0">
          <div className="flex flex-col items-center gap-4 w-full max-w-[360px]">
            <div className="relative inline-block">
              <div ref={previewRef} className="relative inline-block">
                <Preview formData={formData} templateId={templateId} />
                {!unlocked && !hideMark && <Watermark variant={templateId === 3 || templateId === 5 || templateId === 6 || templateId === 8 || templateId === 11 ? 'white' : 'red'} />}
              </div>
              {hideMark && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center text-sm text-gray-500">
                  生成图片中...
                </div>
              )}
            </div>
            <div className="fixed inset-x-0 bottom-0 z-20 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/90 backdrop-blur border-t border-gray-100 lg:static lg:inset-auto lg:p-0 lg:bg-transparent lg:border-0 lg:backdrop-blur-none lg:w-full">
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  disabled={downloadStatus === 'loading' || (!unlocked && !quotaReady)}
                  className="btn-primary flex-1"
                >
                  {downloadStatus === 'loading'
                    ? '生成图片中...'
                    : canOriginal || !quotaReady
                      ? '下载图片'
                      : '下载预览图'}
                </button>
                {quotaReady && !canOriginal && (
                  <button
                    type="button"
                    onClick={() => setPayOpen(true)}
                    className="btn-ghost shrink-0"
                  >
                    请杯奶茶
                  </button>
                )}
              </div>
              {downloadStatus === 'err' && (
                <p className="mt-2 text-sm text-center text-rose-600">下载失败，请重试</p>
              )}
              <p className="mt-2 text-xs text-center text-gray-500">
                {canOriginal || !quotaReady
                  ? (isWeChat() ? '请长按图片保存，发微信时打开「原图」' : '发微信请打开「原图」，否则会被压缩变糊')
                  : '预览图带水印。请开发者喝杯奶茶后，可下载无水印原图'}
              </p>
            </div>
          </div>
        </main>
      </div>

      {wechatImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4"
          onClick={() => setWechatImage(null)}
        >
          <p className="text-white text-sm mb-3">长按图片保存到相册，发送时请选「原图」</p>
          <img
            src={wechatImage}
            alt="请柬"
            className="max-h-[72vh] max-w-full rounded-lg"
            onClick={e => e.stopPropagation()}
          />
          <button
            type="button"
            className="mt-4 btn-ghost text-white bg-white/20"
            onClick={() => setWechatImage(null)}
          >
            关闭
          </button>
        </div>
      )}

      {payOpen && (
        <UnlockModal onClose={() => setPayOpen(false)} onUnlocked={handleUnlocked} />
      )}
    </div>
  )
}

export default App
