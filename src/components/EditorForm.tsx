import { useState, type ReactNode } from 'react'
import type { FormData } from '../types/formData'
import { getWeekday } from '../utils/weekday'
import { NAME_FONT_OPTIONS, FONT_SIZE_OPTIONS } from '../utils/fonts'

interface Props {
  data: FormData
  onChange: (data: FormData) => void
}

type Tab = 'basic' | 'words' | 'type'

const TABS: { id: Tab; label: string }[] = [
  { id: 'basic', label: '填写' },
  { id: 'words', label: '称呼用语' },
  { id: 'type', label: '字体' },
]

export function EditorForm({ data, onChange }: Props) {
  const [tab, setTab] = useState<Tab>('basic')

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    const next = { ...data, [k]: v }
    if (k === 'solarDate' && typeof v === 'string') next.solarWeekday = getWeekday(v)
    if (k === 'groom' && data.inviteName1 === data.groom && typeof v === 'string') next.inviteName1 = v
    if (k === 'bride' && data.inviteName2 === data.bride && typeof v === 'string') next.inviteName2 = v
    onChange(next)
  }

  return (
    <div className="w-full">
      <div className="flex rounded-xl bg-gray-100 p-0.5 mb-3">
        {TABS.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              tab === item.id ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'basic' && (
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          <Field label="新郎">
            <input className="input-compact" value={data.groom} placeholder="张三" onChange={e => update('groom', e.target.value)} />
          </Field>
          <Field label="新娘">
            <input className="input-compact" value={data.bride} placeholder="李四" onChange={e => update('bride', e.target.value)} />
          </Field>
          <Field label="公历">
            <input type="date" className="input-compact" value={data.solarDate} onChange={e => update('solarDate', e.target.value)} />
          </Field>
          <Field label="农历">
            <input className="input-compact" value={data.lunar} placeholder="九月初八" onChange={e => update('lunar', e.target.value)} />
          </Field>
          <Field label="时间">
            <input className="input-compact" value={data.time} placeholder="中午十二时整" onChange={e => update('time', e.target.value)} />
          </Field>
          <Field label="典礼类型">
            <input className="input-compact" value={data.eventPhrase} placeholder="结婚喜宴" onChange={e => update('eventPhrase', e.target.value)} />
          </Field>
          <Field label="举办地点" className="col-span-2">
            <input className="input-compact" value={data.location} placeholder="某某大酒店三楼宴会厅" onChange={e => update('location', e.target.value)} />
          </Field>
        </div>
      )}

      {tab === 'words' && (
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          <Field label="送呈对象">
            <input className="input-compact" value={data.recipient} placeholder="张三先生" onChange={e => update('recipient', e.target.value)} />
          </Field>
          <Field label="举办对象">
            <input className="input-compact" value={data.honoree} placeholder="我儿、小女" onChange={e => update('honoree', e.target.value)} />
          </Field>
          <Field label="敬邀姓名1">
            <input className="input-compact" value={data.inviteName1} placeholder="张三" onChange={e => update('inviteName1', e.target.value)} />
          </Field>
          <Field label="敬邀姓名2">
            <input className="input-compact" value={data.inviteName2} placeholder="李四" onChange={e => update('inviteName2', e.target.value)} />
          </Field>
          <Field label="典礼用语" className="col-span-2">
            <input className="input-compact" value={data.ceremonyText} placeholder="举行婚礼典礼" onChange={e => update('ceremonyText', e.target.value)} />
          </Field>
          <Field label="敬邀语一">
            <input className="input-compact" value={data.inviteLine1} placeholder="敬备喜筵" onChange={e => update('inviteLine1', e.target.value)} />
          </Field>
          <Field label="敬邀语二">
            <input className="input-compact" value={data.inviteLine2} placeholder="恭请光临" onChange={e => update('inviteLine2', e.target.value)} />
          </Field>
          <Field label="落款敬语" className="col-span-2">
            <input className="input-compact" value={data.inviteClosing} placeholder="敬邀" onChange={e => update('inviteClosing', e.target.value)} />
          </Field>
        </div>
      )}

      {tab === 'type' && (
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          <Field label="姓名字体">
            <select className="input-compact" style={{ fontFamily: data.nameFont }} value={data.nameFont} onChange={e => update('nameFont', e.target.value)}>
              {NAME_FONT_OPTIONS.map(opt => (
                <option key={opt.label} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>
          <Field label="姓名加粗">
            <select className="input-compact" value={data.nameBold ? '1' : '0'} onChange={e => update('nameBold', e.target.value === '1')}>
              <option value="0">不加粗</option>
              <option value="1">加粗</option>
            </select>
          </Field>
          <Field label="新人字号">
            <select className="input-compact" value={data.coupleFontSize} onChange={e => update('coupleFontSize', e.target.value)}>
              {FONT_SIZE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>
          <Field label="敬邀人字号">
            <select className="input-compact" value={data.inviteNameFontSize} onChange={e => update('inviteNameFontSize', e.target.value)}>
              {FONT_SIZE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>
          <Field label="时间地点字号" className="col-span-2">
            <select className="input-compact" value={data.timeLocationFontSize} onChange={e => update('timeLocationFontSize', e.target.value)}>
              {FONT_SIZE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="block text-xs text-gray-500 mb-1">{label}</span>
      {children}
    </label>
  )
}
