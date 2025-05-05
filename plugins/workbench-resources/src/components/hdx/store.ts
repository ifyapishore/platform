// WorkbenchNavigatorStore.ts

import { writable, derived, get, type Readable } from 'svelte/store'
import { pluginListStore } from '../stores/pluginListStore'
import { userPreferencesStore } from '../stores/userPreferencesStore'

// internal state definition (all fields here)
const state = writable({
  expanded: false,
  workspaceMode: false,
  appsEditMode: false
})

// value barrier utility to limit recalculation
function valueBarrier<T> (source: Readable<T>, isEqual = (a: T, b: T) => a === b): Readable<T> {
  let last: T
  return derived(source, ($v, set) => {
    if (!isEqual($v, last)) {
      last = $v
      set($v)
    }
  })
}

// store definition
const storeDefinition = {
  // reactive selectors
  isExpanded: derived(state, s => s.expanded),
  isWorkspaceMode: derived(state, s => s.workspaceMode),
  isAppsEditMode: derived(state, s => s.appsEditMode),

  // reactive integration with external stores (examples)
  hasPlugins: valueBarrier(derived(pluginListStore, list => list.length > 0)),
  prefersCompact: derived(userPreferencesStore, p => p.ui.compactMode === true),

  // actions
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
3. Integrates **external stores** via derived values and `valueBarrier()` to prevent unnecessary recalculations.
4. All **actions** are centralized and update multiple fields transactionally.
5. Store object is passed as a single prop to children.
6. Children use `$store.isExpanded` or invoke `store.toggleWorkspaceMode()` directly.

📌 Example usage in child:
```svelte
<script lang="ts">
  import type { IWorkbenchStore } from './WorkbenchNavigatorStore'
  export let store: IWorkbenchStore
</script>

<div class:expanded={$store.isExpanded}>
  <button on:click={store.toggleWorkspaceMode}>Toggle Workspace</button>
</div>
```

📌 Example usage in parent:
```svelte
<script>
  import { store as navigatorStore } from './WorkbenchNavigatorStore'
  import NavigatorPanel from './NavigatorPanel.svelte'
</script>

<NavigatorPanel store={navigatorStore} />
```

📌 🔄 Local instance (alternative to singleton):
```ts
// WorkbenchNavigatorStore.local.ts
import { writable, derived, type Readable } from 'svelte/store'

export function createWorkbenchStore(): IWorkbenchStore {
  const state = writable({
    expanded: false,
    workspaceMode: false,
    appsEditMode: false
  })

  return {
    isExpanded: derived(state, s => s.expanded),
    isWorkspaceMode: derived(state, s => s.workspaceMode),
    isAppsEditMode: derived(state, s => s.appsEditMode),
    hasPlugins: derived([], () => false), // override as needed
    prefersCompact: derived([], () => false),
    onHover: () => state.update(s => ({ ...s, expanded: true })),
    onBlur: () => state.update(s => ({ ...s, expanded: false, workspaceMode: false })),
    toggleWorkspaceMode: () => state.update(s => ({ ...s, workspaceMode: !s.workspaceMode })),
    toggleAppsEditMode: () => state.update(s => ({ ...s, appsEditMode: !s.appsEditMode }))
  }
}
```

```svelte
<script lang="ts">
  import { createWorkbenchStore, type IWorkbenchStore } from './WorkbenchNavigatorStore.local'
  const store: IWorkbenchStore = createWorkbenchStore()
</script>

<NavigatorPanel store={store} />
```

📌 Integration with external stores:
- `pluginListStore` is used to derive `hasPlugins`
- `userPreferencesStore` is used to derive `prefersCompact`

🧠 Answers to Key Questions:

1️⃣ **Will children rerender in one cycle on complex action?**
✅ Yes. Svelte batches updates to `writable` stores during a single `.update()` call, so if multiple properties change together (as in `onBlur()`), all derived store subscribers update in **one render cycle**.

2️⃣ **Will children rerender only on real dependencies?**
✅ Yes. Children using only `$store.isExpanded` will not rerender if only `workspaceMode` changes. `valueBarrier()` ensures costly derived computations are skipped if values haven't changed.

🛠️ Tips:
- Use `valueBarrier()` around derived stores to debounce recalculations from heavy or unstable dependencies.
- Keep store integration code colocated and scoped logically.
- Consider prefixing external store accessors with `has`, `uses`, `prefers` for semantic clarity.

*/
