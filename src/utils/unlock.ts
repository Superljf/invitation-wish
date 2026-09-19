import {
  DOWNLOAD_COUNT_COOKIE,
  DOWNLOAD_COUNT_IDB,
  DOWNLOAD_COUNT_KEY,
  FREE_DOWNLOAD_LIMIT,
  UNLOCK_HASHES,
  UNLOCK_SALT,
  UNLOCK_STORAGE_KEY,
} from '../config/pay'

const OLD_COUNT_KEY = 'invitation-free-download-count'
const IDB_STORE = 'q'

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

function cookiePath() {
  const base = import.meta.env.BASE_URL || '/'
  if (base === '/') return '/'
  return base.endsWith('/') ? base.slice(0, -1) : base
}

function readCookie() {
  try {
    const hit = document.cookie.split(';').map(s => s.trim()).find(s => s.startsWith(`${DOWNLOAD_COUNT_COOKIE}=`))
    if (!hit) return null
    return decodeURIComponent(hit.slice(DOWNLOAD_COUNT_COOKIE.length + 1))
  } catch {
    return null
  }
}

function writeCookie(raw: string) {
  const secure = location.protocol === 'https:' ? ';Secure' : ''
  document.cookie = `${DOWNLOAD_COUNT_COOKIE}=${encodeURIComponent(raw)};Max-Age=34560000;Path=${cookiePath()};SameSite=Lax${secure}`
}

function readLs() {
  try {
    return localStorage.getItem(DOWNLOAD_COUNT_KEY)
  } catch {
    return null
  }
}

function writeLs(raw: string) {
  localStorage.setItem(DOWNLOAD_COUNT_KEY, raw)
}

function openIdb(): Promise<IDBDatabase | null> {
  return new Promise(resolve => {
    try {
      const req = indexedDB.open(DOWNLOAD_COUNT_IDB, 1)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE)
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => resolve(null)
    } catch {
      resolve(null)
    }
  })
}

async function readIdb() {
  const db = await openIdb()
  if (!db) return null
  return new Promise<string | null>(resolve => {
    try {
      const tx = db.transaction(IDB_STORE, 'readonly')
      const req = tx.objectStore(IDB_STORE).get('d')
      req.onsuccess = () => resolve(typeof req.result === 'string' ? req.result : null)
      req.onerror = () => resolve(null)
      tx.oncomplete = () => db.close()
    } catch {
      db.close()
      resolve(null)
    }
  })
}

async function writeIdb(raw: string) {
  const db = await openIdb()
  if (!db) return
  await new Promise<void>(resolve => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite')
      tx.objectStore(IDB_STORE).put(raw, 'd')
      tx.oncomplete = () => {
        db.close()
        resolve()
      }
      tx.onerror = () => {
        db.close()
        resolve()
      }
    } catch {
      db.close()
      resolve()
    }
  })
}

async function signUsed(n: number) {
  return (await sha256Hex(`${UNLOCK_SALT}:dl:${n}`)).slice(0, 16)
}

async function parseUsed(raw: string | null): Promise<number | null> {
  if (!raw) return null
  const [nStr, sig] = raw.split('.')
  const n = Number(nStr)
  if (!Number.isFinite(n) || n < 0 || !sig) return FREE_DOWNLOAD_LIMIT
  const expect = await signUsed(Math.floor(n))
  if (expect !== sig) return FREE_DOWNLOAD_LIMIT
  return Math.min(Math.floor(n), FREE_DOWNLOAD_LIMIT)
}

async function collectUsed() {
  const packed = [readLs(), readCookie(), await readIdb()]
  const nums = await Promise.all(packed.map(parseUsed))
  const known = nums.filter((n): n is number => n !== null)
  if (known.length) return Math.max(...known)
  try {
    const legacy = Number(localStorage.getItem(OLD_COUNT_KEY) || '')
    if (Number.isFinite(legacy) && legacy > 0) {
      return Math.min(Math.floor(legacy), FREE_DOWNLOAD_LIMIT)
    }
  } catch {
    /* ignore */
  }
  return 0
}

async function persistUsed(n: number) {
  const raw = `${n}.${await signUsed(n)}`
  writeLs(raw)
  writeCookie(raw)
  await writeIdb(raw)
  try {
    localStorage.removeItem(OLD_COUNT_KEY)
  } catch {
    /* ignore */
  }
}

export async function hydrateFreeUsed() {
  const used = await collectUsed()
  if (used > 0) await persistUsed(used)
  return used
}

export function remainingFree(used: number) {
  return Math.max(0, FREE_DOWNLOAD_LIMIT - used)
}

export async function consumeFreeDownload() {
  const used = Math.min((await collectUsed()) + 1, FREE_DOWNLOAD_LIMIT)
  await persistUsed(used)
  return used
}

async function sha256Hex(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf))
    .map(b => toHex(b))
    .join('')
}

function toHex(b: number) {
  return b.toString(16).padStart(2, '0')
}

/** 校验专属码（大小写、空格忽略） */
export async function verifyUnlockCode(raw: string) {
  const code = raw.replace(/\s/g, '').toUpperCase()
  if (!code) return false
  const digest = await sha256Hex(UNLOCK_SALT + code)
  return UNLOCK_HASHES.indexOf(digest) !== -1
}
