// WorkbenchNavigatorStore.ts

import { writable, derived, type Readable } from 'svelte/store'
import { pluginListStore } from '../stores/pluginListStore'
import { userPreferencesStore } from '../stores/userPreferencesStore'

// ───────────────────────────────────────────────────────────────
// TYPES + EXPORTS
// ───────────────────────────────────────────────────────────────
type ExtractStoreShape<T> = {
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

// ───────────────────────────────────────────────────────────────
// STORE INTERNALS
// ───────────────────────────────────────────────────────────────
const state = writable({
  expanded: false,
  workspaceMode: false,
  appsEditMode: false
})

// ───────────────────────────────────────────────────────────────
// DERIVED VALUES (GROUPED, LINEAR ORDER)
// ───────────────────────────────────────────────────────────────

// Group A — Raw base values
const isExpanded = derived(state, s => s.expanded)
const isWorkspaceMode = derived(state, s => s.workspaceMode)
const isAppsEditMode = derived(state, s => s.appsEditMode)

// Group B — External store projections
const hasPlugins = valueBarrier(derived(pluginListStore, list => list.length > 0))
const prefersCompact = derived(userPreferencesStore, p => p.ui.compactMode === true)

// Group C — First-order combinations
const isOn = derived([state, userPreferencesStore], ([$s, $p]) => $s.expanded === true && $p.ui.compactMode === false)

// Group D — Branches off `isOn`
const isOnTop = derived([state, isOn], ([$s, on]) => $s.workspaceMode && on)
const isOnBottom = derived([state, isOn], ([$s, on]) => $s.appsEditMode && on)

// Group E — Final combinator logic
const isOnMiddle = derived([isOnTop, isOnBottom], ([top, bottom]) => !top && !bottom)

const isTaskCompleted = fromAsync(async () => {
  return true
})

const storeDefinition = {
  isExpanded,
  isWorkspaceMode,
  isAppsEditMode,
  hasPlugins,
  prefersCompact,
  //   isOn, // some internal logic CANBE/MUST be hidden from the outside due the BL
  isOnTop,
  isOnBottom,
  isOnMiddle,
  isTaskCompleted,

  // actions (TODO: redux style, optimize)
  onHover () {
    state.update(s => ({ ...s, expanded: true }))
  },

  onBlur () {
    state.update(s => ({ ...s, expanded: false, workspaceMode: false }))
  },

  toggleWorkspaceMode () {
    state.update(s => ({ ...s, workspaceMode: !s.workspaceMode }))
  },

  toggleAppsEditMode () {
    state.update(s => ({ ...s, appsEditMode: !s.appsEditMode }))
  }
}

export type IWorkbenchStore = ExtractStoreShape<typeof storeDefinition>
export const store: IWorkbenchStore = storeDefinition
