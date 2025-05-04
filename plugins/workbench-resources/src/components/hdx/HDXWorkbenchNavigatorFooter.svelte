<script lang="ts">
  import { Writable } from 'svelte/store'

  // export let windowWorkspaceName: string
  export let expanded: Writable<boolean>
  export let expandedWorkspaces: Writable<boolean>
  // export let appsMini: boolean
    // class="info-box {$deviceInfo.navigator.direction}"
    //     class:vertical-mobile={$deviceInfo.navigator.direction === 'vertical'}
    //     class:mini={appsMini}

    // let direction = $deviceInfo.navigator.direction
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
