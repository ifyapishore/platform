<script lang="ts">
  import type { IWorkbenchUiModel } from './HDXWorkspaceModel'

  // Props
  export let mode: 'action' | 'profile'
  export let workbenchUiModel: IWorkbenchUiModel

  // Rendering shortcuts
  $: expanded = workbenchUiModel.isExpanded
  $: expandedWorkspaces = workbenchUiModel.isWorkspaceMode
</script>

<div
  class="HDXWorkbenchNavigatorFooterItem"
  class:expanded={$expanded}
  class:modeAction={mode === 'action'}
  class:modeProfile={mode === 'profile'}
  class:expandedWorkspace={$expandedWorkspaces}
>
  <slot/>
</div>

<style lang="scss">
  .HDXWorkbenchNavigatorFooterItem {
    display: flex; /* ✅ */
    flex-grow: 1;
    min-width: 0; /* optional, to prevent overflow */
    justify-content: center;
    align-items: center;

    &.expanded {
      display: flex;

      &.expandedWorkspace {
        display: flex;
      }
    }
  }
</style>
