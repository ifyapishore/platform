import { writable, derived, get } from 'svelte/store'
import type { ExtractStoreShape } from './model-utils'

// debug/behavior constants;
// use for debug purpuses only
const hdxAlwaysExpand = false
// if true, the navigator will always be expanded at first and collapse after delay
const useFirstTimeShow = false
const firstTimeDelay = 3000 // 3 seconds
const hdxAlwaysExpandWorkspaces = false // hdxAlwaysExpand

// ───────────────────────────────────────────────────────────────
// STORE INTERNALS
// ───────────────────────────────────────────────────────────────
const state = writable({
  expanded: hdxAlwaysExpand,
  workspaceMode: hdxAlwaysExpandWorkspaces,
  appsEditMode: false,
  hoveredOnce: false,
  workspaceColor: 1
})

// ───────────────────────────────────────────────────────────────
// DERIVED VALUES (GROUPED, LINEAR ORDER)
// ───────────────────────────────────────────────────────────────

// Group A — Raw base values
const isExpanded = derived(state, s => s.expanded)
const isWorkspaceMode = derived(state, s => s.workspaceMode)
const isAppsEditMode = derived(state, s => s.appsEditMode)

// Group B — External store projections
// TODO: move to external store
const workspaceColor = derived(state, s => s.workspaceColor)

// Group C — Computed values
const isExpandedWide = derived(state, s => s.expanded && s.workspaceMode)

const appsMini = derived(state, s => false)

const storeDefinition = {
  isExpanded,
  isExpandedWide,
  isWorkspaceMode,
  isAppsEditMode,
  workspaceColor,
  appsMini,

  // actions (TODO: redux style, optimize)
  onHover () {
    state.update(s => ({ ...s, expanded: true, hoveredOnce: true }))
    console.log('onHover' + get(this.isExpanded))
  },

  onBlur () {
    state.update(s => ({
      ...s,
      expanded: false,
      appsEditMode: false,
      workspaceMode: hdxAlwaysExpandWorkspaces && hdxAlwaysExpand
    }))

    console.log('onBlur' + get(this.isExpanded))
  },

  toggleWorkspaceMode () {
    if (!hdxAlwaysExpandWorkspaces) {
      state.update(s => ({ ...s, workspaceMode: !s.workspaceMode }))
    }
  },

  toggleAppsEditMode () {
    state.update(s => ({ ...s, appsEditMode: !s.appsEditMode }))
  },

  onMount () {
    if (useFirstTimeShow) {
      setTimeout(() => {
        state.update(s => ({ ...s, expanded: false }))
      }, firstTimeDelay)
    }
  },

  setWorkspaceColor (color: number) {
    state.update(s => ({ ...s, workspaceColor: color }))
  },

  onWorkspaceSelected () {
    state.update(s => ({
      ...s,
      expanded: hdxAlwaysExpandWorkspaces,
      workspaceMode: hdxAlwaysExpandWorkspaces
    }))
  }
}

export type IWorkbenchUiModel = ExtractStoreShape<typeof storeDefinition>
export const workbenchUiModel: IWorkbenchUiModel = storeDefinition
