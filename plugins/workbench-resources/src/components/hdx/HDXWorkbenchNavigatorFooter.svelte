<script lang="ts">
  import type { IWorkbenchUiModel } from './HDXWorkspaceModel'

  // Props
  export let workbenchUiModel: IWorkbenchUiModel

  // Rendering shortcuts
  $: expanded = workbenchUiModel.isExpanded
  $: expandedWorkspaces = workbenchUiModel.isWorkspaceMode
</script>

<div
  class="HDXWorkbenchNavigatorFooter"
  class:expanded={$expanded}
  class:expandedWorkspace={$expandedWorkspaces}
>
  <slot/>
</div>

<style lang="scss">
  .HDXWorkbenchNavigatorFooter {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    min-height: 3rem;
    max-height: 3rem;
    height: 3rem;

    display: none;

    &.expanded {
      display: flex;

      &.expandedWorkspace {
        display: flex;
      }
    }
  }
</style>
