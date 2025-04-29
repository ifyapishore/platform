<script lang="ts">
  import { Writable } from 'svelte/store'

  // export let windowWorkspaceName: string
  export let expanded: boolean
  export let expandedWorkspaces: Writable<boolean>
  // export let appsMini: boolean
    // class="info-box {$deviceInfo.navigator.direction}"
    //     class:vertical-mobile={$deviceInfo.navigator.direction === 'vertical'}
    //     class:mini={appsMini}

    // let direction = $deviceInfo.navigator.direction
</script>

<div
  class="HDXWorkbenchNavigatorFooter"
  class:expanded={expanded}
  class:expandedWorkspace={$expandedWorkspaces}
>
  <slot/>
</div>

<style>
  .HDXWorkbenchNavigatorFooter {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    flex-grow: 1;

    display: none;

    & > {
      flex: 1 1 0; /* ✅ */
      min-width: 0; /* optional, to prevent overflow */
      text-align: center;
      border: 1px solid gray;
      padding: 1rem;
    }

    &.expanded {
      display: flex;

      &.expandedWorkspace {
        display: flex;
      }
    }
  }
</style>
