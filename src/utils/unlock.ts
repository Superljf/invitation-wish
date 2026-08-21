import { UNLOCK_HASHES, UNLOCK_SALT, UNLOCK_STORAGE_KEY } from '../config/pay'

export function loadUnlocked() {
  try {
    return localStorage.getItem(UNLOCK_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function saveUnlocked() {
  localStorage.setItem(UNLOCK_STORAGE_KEY, '1')
}

async function sha256Hex(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/** 校验专属码（大小写、空格忽略） */
export async function verifyUnlockCode(raw: string) {
  const code = raw.replace(/\s/g, '').toUpperCase()
  if (!code) return false
  const digest = await sha256Hex(UNLOCK_SALT + code)
  return UNLOCK_HASHES.indexOf(digest) !== -1
}
