<script lang="ts">
  import { Writable } from 'svelte/store'

  // export let windowWorkspaceName: string
  export let expanded: Writable<boolean>
  export let expandedWorkspaces: Writable<boolean>

  // Local expanded state
  // export let expandedWorkspaces: Writable<boolean>
  // export let onToggleExpandedWorkspaces: () => void

  const appsMini = false

</script>

<div
  class="HDXWorkbenchNavigatorBody"
  class:expanded={$expanded}
  class:appsMini={appsMini}
  class:expandedWorkspace={$expandedWorkspaces}
>
</div>

<style>
  .HDXWorkbenchNavigatorBody {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    flex-grow: 1;

    background-color: red;
    &.expanded {

      &.expandedWorkspace {
        padding-right: 4rem;
      }
    }
  }
</style>
