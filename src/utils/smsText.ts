import type { FormData } from '../types/formData'

/** 把请柬表单收成可复制的短信/微信文字，方便发给不开链接的长辈 */
export function buildSmsText(f: FormData): string {
  const [y, m, d] = f.solarDate.split('-').map(Number)
  const solar = Number.isFinite(y)
    ? `公历${y}年${m}月${d}日${f.solarWeekday ? `（${f.solarWeekday}）` : ''}`
    : f.solarDate
  const lunar = f.lunar.trim() ? `农历${f.lunar.trim()}` : ''
  const datePart = [solar, lunar].filter(Boolean).join('、')

  const honoree = f.honoree.trim()
  const couple = [f.groom, f.bride].map(s => s.trim()).filter(Boolean).join('、')
  const who = honoree ? (couple ? `${honoree} ${couple}` : honoree) : couple
  const event = f.eventPhrase.trim() || '结婚喜宴'

  const lines: string[] = []
  const recipient = f.recipient.trim()
  if (recipient) {
    lines.push(`送呈${recipient}台启`)
    lines.push('')
  }

  const forWhom = who ? `为${who}` : ''
  lines.push(`谨定于${datePart}${forWhom ? `，${forWhom}` : ''}举行${event}。`)

  const placeTime = [
    f.location.trim() ? `席设${f.location.trim()}` : '',
    f.time.trim() ? `时间${f.time.trim()}` : '',
  ].filter(Boolean).join('，')
  if (placeTime) lines.push(`${placeTime}。`)

  const invite = [f.inviteLine1, f.inviteLine2]
    .map(s => s.trim())
    .filter(Boolean)
    .join('，')
  if (invite) lines.push(invite.endsWith('。') ? invite : `${invite}。`)

  const names = [f.inviteName1, f.inviteName2].map(s => s.trim()).filter(Boolean).join(' ')
  const closing = f.inviteClosing.trim() || '敬邀'
  if (names) lines.push(`${names} ${closing}`)
  else lines.push(closing)

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'fixed'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(el)
    return ok
  }
}
