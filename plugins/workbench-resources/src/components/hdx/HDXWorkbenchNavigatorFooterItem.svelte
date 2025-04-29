<script lang="ts">
  import { Writable } from 'svelte/store'

  // export let windowWorkspaceName: string
  export let mode: 'action' | 'profile'
  export let expanded: Writable<boolean>
  export let expandedWorkspaces: Writable<boolean>
  // export let appsMini: boolean
    // class="info-box {$deviceInfo.navigator.direction}"
    //     class:vertical-mobile={$deviceInfo.navigator.direction === 'vertical'}
    //     class:mini={appsMini}

    // let direction = $deviceInfo.navigator.direction
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

<style>
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
