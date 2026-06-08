/**
 * Client-side lead form guards for a static Next.js site.
 * Not a substitute for server verification — raises the bar vs bare forms.
 */

export const MIN_FORM_FILL_SECONDS = 3

const LS_PHONES = "leadSubmittedPhones"

/** Obvious test / sequential spam numbers */
const EXTRA_BLOCKED = new Set([
  "1234567890",
  "0123456789",
  "9876543210",
  "9988776655",
])

export function normalizePhone10(input: string): string {
  const d = input.replace(/\D/g, "")
  if (d.length >= 10) return d.slice(-10)
  return d
}

/** Invalid / disposable-style patterns for Indian 10-digit mobiles (starts 6–9). */
export function isBlockedOrFakePhone10(phone10: string): boolean {
  if (phone10.length !== 10) return true
  if (!/^[6-9]\d{9}$/.test(phone10)) return true
  if (EXTRA_BLOCKED.has(phone10)) return true
  if (/^(\d)\1{9}$/.test(phone10)) return true
  return false
}

export function getSubmittedPhones(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(LS_PHONES)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as string[]).filter((x) => typeof x === "string") : []
  } catch {
    return []
  }
}

export function hasSubmittedThisPhone(phone10: string): boolean {
  return getSubmittedPhones().includes(phone10)
}

export function recordSubmittedPhone(phone10: string): void {
  if (typeof window === "undefined") return
  try {
    const list = getSubmittedPhones()
    if (!list.includes(phone10)) {
      list.push(phone10)
      localStorage.setItem(LS_PHONES, JSON.stringify(list))
    }
  } catch {
    /* ignore quota */
  }
}

export function validateFillDuration(formStartedAt: number | null, minSeconds = MIN_FORM_FILL_SECONDS): boolean {
  if (formStartedAt === null) return false
  return (Date.now() - formStartedAt) / 1000 >= minSeconds
}
