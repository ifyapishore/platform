import { writable, derived, get } from 'svelte/store'
import type { ExtractStoreShape } from './model-utils'

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

const storeDefinition = {
  isExpanded,
  isWorkspaceMode,
  isAppsEditMode,

  // actions (TODO: redux style, optimize)
  onHover () {
    state.update(s => ({ ...s, expanded: true }))
    console.log('onHover' + get(this.isExpanded))
  },

  onBlur () {
    state.update(s => ({ ...s, expanded: false, workspaceMode: false }))
    console.log('onBlur' + get(this.isExpanded))
  },

  toggleWorkspaceMode () {
    state.update(s => ({ ...s, workspaceMode: !s.workspaceMode }))
  },

  toggleAppsEditMode () {
    state.update(s => ({ ...s, appsEditMode: !s.appsEditMode }))
  }
}

export type IWorkbenchUiModel = ExtractStoreShape<typeof storeDefinition>
export const workbenchUiModel: IWorkbenchUiModel = storeDefinition
