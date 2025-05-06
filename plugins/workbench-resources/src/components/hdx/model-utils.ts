// WorkbenchNavigatorStore.ts

import { writable, derived, type Readable } from 'svelte/store'

// ───────────────────────────────────────────────────────────────
// TYPES + EXPORTS
// ───────────────────────────────────────────────────────────────
// export type ExtractStoreShape<T> = SvelteStore<T> & {
//   [K in keyof T]: T[K] extends (...args: any) => any
//     ? T[K]
//     : T[K] extends Readable<infer V>
//       ? Readable<V>
//       : never
// }
export type ExtractStoreShape<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any
    ? T[K]
    : T[K] extends Readable<infer V>
      ? Readable<V>
      : never
}
// ───────────────────────────────────────────────────────────────
// VALUE BARRIERS
// ───────────────────────────────────────────────────────────────
export function valueBarrier<T> (source: Readable<T>, isEqual = (a: T, b: T) => a === b): Readable<T> {
  let last: T
  return derived(source, ($v, set) => {
    if (!isEqual($v, last)) {
      last = $v
      set($v)
    }
  })
}

export function valueKeyBarrier<T extends WeakKey, K> (
  source: Readable<T>,
  keyOf: (v: T) => K,
  isEqual: (a: T, b: T) => boolean = (a, b) => a === b,
  memoizeKey = false
): Readable<T> {
  let lastKey: K
  let lastValue: T
  let hasKey = false
  const keyCache = new WeakMap<T, K>()
  return derived(source, ($v, set) => {
    const key = memoizeKey
      ? keyCache.get($v) ?? (() => { const k = keyOf($v); keyCache.set($v, k); return k })()
      : keyOf($v)

    if (!hasKey || key !== lastKey || !isEqual($v, lastValue)) {
      lastKey = key
      lastValue = $v
      hasKey = true
      set($v)
    }
  })
}

// ───────────────────────────────────────────────────────────────
// ASYNC PROMOTION
// ───────────────────────────────────────────────────────────────
type AsyncState = 'await' | 'ok' | 'error'
export function fromAsync<T> (promiseFn: () => Promise<T>): Readable<{ v: T | undefined, m: AsyncState }> {
  const store = writable<{ v: T | undefined, m: AsyncState }>({ v: undefined, m: 'await' })
  promiseFn()
    .then(result => { store.set({ v: result, m: 'ok' }) })
    .catch(() => { store.set({ v: undefined, m: 'error' }) })
  return store
}
