<!--
This component provides a navigation panel for the workbench application.

There modes:
- Collapsed: Shows only the logo and icons of the pinned modules.
- Expanded: Shows the logo, active workbench name, and more section. Close on mouse out or tach outside.
- Edit: Shows the logo, and edit capabilities. Close on "Done" button click. Mouse out or touch outside does not close the panel, but show warning?
Main features:
- Expand on hover. On touch devices, it expands on tap or global wipe to the right
- LINE 1: Displays the logo + active workbench name in expanded state. Allow to change the workbench from here.
- LINE 2: Pinned modules. Inbox is always first and pinned.
- Scrollable area:
  - List of pinned modules are always visible
    - Collapsed state: icon + selection effect to show current one
    - Expanded state: icon + name
    - Edit state: Reorder shevron + icon + name + remove button
  - More section: visible only in the expanded/edit state!
    - Header: "More" + motto text
    - List of unpinned modules
      - Collapsed state: icon + selection effect to show current one
      - Expanded state: icon + name
      - Edit state: Reorder shevron + icon + name + remove button"

TODO:
  - Profile, settings, and help buttons must be moved to the top bar (user account area)
  - Expanded and edit state must be processed in the global mode (video components can be sensitive to this)
-->
<script lang="ts">
  import {
    deviceOptionsStore as deviceInfo
  } from '@hcengineering/ui'

  import { writable } from 'svelte/store'

  // Local expanded state
  export const expanded = writable(false)

  function handleHover (): void {
    console.log('Hover started')
    expanded.set(true)
    // TODO: visual feedback for hover inactivity though global model
  }

  function handleBlur (): void {
    console.log('Hover ended')
    expanded.set(false)
    // TODO: visual feedback for hover inactivity though global model
  }

  function handleClick (): void {
    console.log('Clicked inside WorkbenchNavigator')
    // You can collapse or do something here
    // event.stopPropagation(); // Prevent bubbling if needed
  }

  // function handleOutsideClick (event: MouseEvent): void {
  //   console.log('Clicked outside WorkbenchNavigator');
  //   // You can collapse or do something here
  //   // event.stopPropagation(); // Prevent bubbling if needed
  // }
</script>

<div
  class="HDXWorkbenchNavigator {$deviceInfo.navigator.direction} no-print"
  class:lastDivider={!$deviceInfo.navigator.visible}
  class:expanded={$expanded}
  role="presentation"
  on:mouseenter={handleHover}
  on:mouseleave={handleBlur}
  on:click={handleClick}>
  <div
    class="HDXWorkbenchNavigator-Inner"
    class:expanded={$expanded}>
    <slot name="header" expanded={$expanded}/>
    <slot name="content" />
    <slot name="footer" />
  </div>
</div>

<style>
  .HDXWorkbenchNavigator {
    position: relative;
    flex-shrink: 0;

    min-width: var(--app-panel-width);
    width: var(--app-panel-width);
    max-width: var(--app-panel-width);

    height: 100%;

    background-color: var(--theme-navpanel-color);
    border-right: 1px solid var(--theme-navpanel-divider);
  }

  .HDXWorkbenchNavigator-Inner {
      position: relative;
      display: flex;
      justify-content: space-between;
      /* align-items: center; */
      flex-direction: column;
      min-width: var(--app-panel-width);
      height: 100%;

      &.expanded {
        min-width: calc(4.5rem * 3);
        z-index: 1;
        backdrop-filter: blur(20px);
        background-color:rgb(131 176 184 / 10%); /* rgba(255,255,255,0.1); */
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-top-right-radius: var(--medium-BorderRadius);
        border-bottom-right-radius: var(--medium-BorderRadius);
      }
    }
</style>
