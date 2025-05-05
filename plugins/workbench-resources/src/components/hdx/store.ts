// WorkbenchNavigatorStore.ts

import { writable, derived, get, type Readable, type Subscriber } from 'svelte/store'
import { pluginListStore } from '../stores/pluginListStore'
import { userPreferencesStore } from '../stores/userPreferencesStore'

// internal state definition (all fields here)
const state = writable({
  expanded: false,
  workspaceMode: false,
  appsEditMode: false
})

// value barrier utility to limit recalculation
function valueBarrier<T>(source: Readable<T>, isEqual = (a: T, b: T) => a === b): Readable<T> {
  let last: T
  return derived(source, ($v, set) => {
    if (!isEqual($v, last)) {
      last = $v
      set($v)
    }
  })
}

// key-based value barrier using hash-style comparison before optional equality check on full value
function valueKeyBarrier<T, K>(
  source: Readable<T>,
  keyOf: (v: T) => K,
  isEqual: (a: T, b: T) => boolean = (a, b) => a === b,
  memoizeKey: boolean = false
): Readable<T> {
  let lastKey: K
  let lastValue: T
  let hasKey = false
  const keyCache = new WeakMap<T, K>()
  return derived(source, ($v, set) => {
    const key = memoizeKey
      ? keyCache.get($v) ?? (() => {
          const k = keyOf($v)
          keyCache.set($v, k)
          return k
        })()
      : keyOf($v)

    if (!hasKey || key !== lastKey || !isEqual($v, lastValue)) {
      lastKey = key
      lastValue = $v
      hasKey = true
      set($v)
    }
  })
}

// promote legacy async values into store-friendly reactive output
export function fromAsync<T>(promiseFn: () => Promise<T>): Readable<{ v: T | undefined; m: 'await' | 'ok' }> {
  const store = writable<{ v: T | undefined; m: 'await' | 'ok' }>({ v: undefined, m: 'await' })
  promiseFn().then(result => {
    store.set({ v: result, m: 'ok' })
  })
  return store
}

// derived values (defined in correct order to avoid circular refs)
const isExpanded = derived(state, s => s.expanded)
const isWorkspaceMode = derived(state, s => s.workspaceMode)
const isAppsEditMode = derived(state, s => s.appsEditMode)
const hasPlugins = valueBarrier(derived(pluginListStore, list => list.length > 0))
const prefersCompact = derived(userPreferencesStore, p => p.ui.compactMode === true)
const isOn = derived([state, userPreferencesStore], ([$s, $p]) => $s.expanded && $p.ui.compactMode === false)
const isOnTop = derived(state, $s => $s.workspaceMode && get(isOn))
const isOnBottom = derived(state, $s => $s.appsEditMode && get(isOn))
const isOnMiddle = derived([isOnTop, isOnBottom], ([top, bottom]) => !top && !bottom)
const isTaskCompleted = fromAsync(() => Promise.resolve(true))

// store definition
const storeDefinition = {
  isExpanded,
  isWorkspaceMode,
  isAppsEditMode,
  hasPlugins,
  prefersCompact,
  isOn,
  isOnTop,
  isOnBottom,
  isOnMiddle,
  isTaskCompleted,

  // actions
  onHover() {
    state.update(s => ({ ...s, expanded: true }))
  },
  onBlur() {
    state.update(s => ({ ...s, expanded: false, workspaceMode: false }))
  },
  toggleWorkspaceMode() {
    state.update(s => ({ ...s, workspaceMode: !s.workspaceMode }))
  },
  toggleAppsEditMode() {
    state.update(s => ({ ...s, appsEditMode: !s.appsEditMode }))
  }
}

// helper type for extracting store interface
type ExtractStoreShape<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any
    ? T[K]
    : T[K] extends Readable<infer V>
    ? Readable<V>
    : never
}

// interface for children components
export type IWorkbenchStore = ExtractStoreShape<typeof storeDefinition>

// exported store instance
export const store: IWorkbenchStore = storeDefinition

/*
======================================
🏗️  Workbench Navigator Store Summary
======================================

This store provides a reactive, centralized state for managing UI transitions and workspace modes.

✅ Architecture:
1. Global store with internal `state` object.
2. Exposes **per-field derived values** (`isExpanded`, `isWorkspaceMode`, etc.) for precise reactivity.
3. Integrates **external stores** via derived values and `valueBarrier()` or `valueKeyBarrier()` to prevent unnecessary recalculations.
4. All **actions** are centralized and update multiple fields transactionally.
5. Store object is passed as a single prop to children.
6. Children use `$store.isExpanded` or invoke `store.toggleWorkspaceMode()` directly.

📌 When to use:

- Use `valueBarrier()` when:
  - You want to prevent rerender unless the entire value is equal.
  - You can afford (or require) comparing full values directly.

- Use `valueKeyBarrier()` when:
  - The actual value is **expensive to compare or noisy**, but you're interested in derived hash/key (like `id`, `version`, `status`).
  - The source value updates frequently but shouldn't trigger rerenders unless the derived key changes.
  - You want a `hashCode + equals`-style optimization:
    - Fast `keyOf()` short-circuits frequent updates
    - Optional `isEqual()` compares final value only if needed
    - If `memoizeKey = true`, `keyOf()` is only called once per object identity (if source is stable).

📌 Example:
```ts
valueKeyBarrier(appListStore, list => list.serverVersion + ':' + list.clientVersion, (a, b) => deepEqual(a, b))
```
This avoids re-rendering when internal list content changes (e.g. during background fetch), but updates UI when server/client version updates.

📌 Promoting Promises into UI state:
```ts
const promoted = fromAsync(() => legacyStore.getProfile())
$: if ($promoted.m === 'await') showSpinner()
```
Provides `{ v, m }` for safe async tracking.

📌 Example store usage:
```ts
isTaskCompleted: fromAsync(() => taskStatusApi.getStatus('task1'))
```

📌 Pattern for dependent derived values:
If derived values depend on other derived fields within the same store:
1. **Define them outside** the store object first
2. Use `get(storeField)` only during initialization
3. Maintain definition **order** to avoid circular references

```ts
const isOn = derived([state, otherStore], ...)
const isOnTop = derived(state, ... get(isOn))
const isOnMiddle = derived([isOnTop, isOnBottom], ...)
```
*/
