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
  import { onMount } from 'svelte'
  import {
    deviceOptionsStore as deviceInfo
  } from '@hcengineering/ui'

  import { writable } from 'svelte/store'

  // debug/beahvior constants;
  const hdxAlwaysExpand = true
  const useFirstTimeShow = false
  const hdxAlwaysExpandWorkspaces = false // hdxAlwaysExpand

  // Local state
  export const expanded = writable(useFirstTimeShow ? true : hdxAlwaysExpand)
  export const expandedWorkspaces = writable(hdxAlwaysExpandWorkspaces)

  const hoveredOnce = writable(hdxAlwaysExpand)

  function handleHover (): void {
    console.log('Hover started')
    expanded.set(true)
    hoveredOnce.set(true)
    // TODO: visual feedback for hover inactivity though global model
  }

  function handleBlur (): void {
    console.log('Hover ended')
    expanded.set(hdxAlwaysExpand)
    if (!hdxAlwaysExpandWorkspaces) {
      expandedWorkspaces.set(false)
    }
    // TODO: visual feedback for hover inactivity though global model
  }

  function handleClick (): void {
    console.log('Clicked inside WorkbenchNavigator')
    // You can collapse or do something here
    // event.stopPropagation(); // Prevent bubbling if needed
  }

  function handleToggleWorkspaceSelector (): void {
    if (!hdxAlwaysExpandWorkspaces) {
      expandedWorkspaces.update(v => !v)
    }
  }

  // Rendering shortcuts
  $: expandedWide = $expanded && $expandedWorkspaces

  onMount(() => {
    if (useFirstTimeShow) {
      setTimeout(() => {
        if (!$hoveredOnce) {
          expanded.set(hdxAlwaysExpand)
        }
      }, 3000)
    }
  })
</script>

<div
  class="HDXWorkbenchNavigator {$deviceInfo.navigator.direction} no-print"
  class:lastDivider={!$deviceInfo.navigator.visible}
  role="presentation"
  on:mouseenter={handleHover}
  on:mouseleave={handleBlur}
  on:click={handleClick}>
  <div
    class="HDXWorkbenchNavigator-Inner"
    class:expanded={$expanded}
    class:expandedWide={expandedWide}
    >
    <slot name="header"
      expanded={expanded}
      expandedWorkspaces={expandedWorkspaces}
      onToggleExpandedWorkspaces={handleToggleWorkspaceSelector}/>
      {#if !$expandedWorkspaces}
        <slot name="content"
          expanded={expanded}
          expandedWorkspaces={expandedWorkspaces}
        />
        <slot name="footer"
          expanded={expanded}
          expandedWorkspaces={expandedWorkspaces}
        />
    {/if}
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
    z-index: 1000000
    /* margin-top: calc(var(--theme-hdx-app-title-height) * -1); */
  }

  .HDXWorkbenchNavigator-Inner {
      position: relative;
      display: flex;
      justify-content: space-between;
      /* align-items: center; */
      flex-direction: column;
      min-width: var(--app-panel-width);
      max-width: var(--app-panel-width);
      width: var(--app-panel-width);
      height: 100%;
      border: none;
      /* background-color: blue; */

      &.expanded {
        min-width: calc(var(--app-panel-width) * 3);
        max-width: calc(var(--app-panel-width) * 3);
        width: calc(var(--app-panel-width) * 3);
        z-index: 1;
        backdrop-filter: blur(30px);
        background-color: var(--theme-hdx-workbench-navigator-bg-color-expanded);

        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-top-right-radius: var(--medium-BorderRadius);
        border-bottom-right-radius: var(--medium-BorderRadius);

        &.expandedWide {
          min-width: calc(var(--app-panel-width) * 5);
          max-width: calc(var(--app-panel-width) * 5);
          width: calc(var(--app-panel-width) * 5);
          backdrop-filter: blur(30px);
          background-color: var(--theme-hdx-workbench-navigator-bg-color-expanded2);
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
      }
    }
</style>
