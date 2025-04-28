<script lang="ts">
  import { Writable } from 'svelte/store'
  import Logo from './Logo.svelte'
  import HDXWorkspaceSwitch from './icons/HDXWorkspaceSwitch.svelte'
  import HDXWorkspaceSelector from './HDXWorkspaceSelector.svelte'

  export let windowWorkspaceName: string
  export let expanded: boolean

  // Local expanded state
  export let expandedWorkspaces: Writable<boolean>
  export let onToggleExpandedWorkspaces: () => void

  const appsMini = false

  // $: debugTitle = expanded ? 'yes' : 'no'

  function toggleWorkspace (event: MouseEvent): void {
    onToggleExpandedWorkspaces()
    event.stopPropagation()
    event.preventDefault()
  }
</script>

<div
  class="HDXWorkbenchNavigatorHeader"
  class:expanded={expanded}
>
  <div
  class="HDXWorkbenchNavigatorHeaderTop"
  class:expanded={expanded}
  role="presentation"
  on:click={toggleWorkspace}
  >
    <div
      class="HDXWorkbenchNavigatorHeaderTop-Logo"
      class:expanded={expanded}
    >
      <Logo mini={appsMini} workspace={windowWorkspaceName} />
    </div>
    <div
      class="HDXWorkbenchNavigatorHeaderTop-Workspace"
      class:expanded={expanded}
      role="presentation"
      on:click={toggleWorkspace}>
        <div
        class="HDXWorkbenchNavigatorHeaderTop-Workspace-Title"
        class:expanded={expanded}>
        Workspace
      </div>
      <div
        class="HDXWorkbenchNavigatorHeaderTop-Workspace-Subtitle"
        class:expanded={expanded}>
        {windowWorkspaceName}
      </div>
    </div>
    <div
      class="HDXWorkbenchNavigatorHeaderTop-WorkspaceSwitch"
      class:expanded={expanded}
      role="presentation"
      on:click={toggleWorkspace}>
      <HDXWorkspaceSwitch expanded={expanded} size="medium" />
    </div>
  </div>
  {#if $expandedWorkspaces}
    <div>Workspaces</div>
    <HDXWorkspaceSelector/>
  {/if}
</div>

<style>
  .HDXWorkbenchNavigatorHeader {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;

    &.expanded {
      background-color:rgb(131 176 184 / 10%); /* rgba(255,255,255,0.1); */
      box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.05);
    }
  }

  .HDXWorkbenchNavigatorHeaderTop {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 4.5rem;
    width: 100%;
  }

  .HDXWorkbenchNavigatorHeaderTop-Logo {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    min-width: var(--app-panel-width);
    width: var(--app-panel-width);
    max-width: var(--app-panel-width);
  }

  .HDXWorkbenchNavigatorHeaderTop-Workspace {
    position: relative;
    display: none;
    flex: 1 1 0;
    overflow: hidden;
    align-items: stretch;
    flex-direction: column;

    &.expanded {
      display: flex;
    }
  }

  .HDXWorkbenchNavigatorHeaderTop-Workspace-Title {
    position: relative;
    display: flex;
    overflow: hidden;
    flex-direction: row;
    align-items: flex-end;
    justify-content: start;
    color: #797878;
    font-size: 0.7rem;
    text-transform: uppercase;
    height: 1.9rem;
  }

  .HDXWorkbenchNavigatorHeaderTop-Workspace-Subtitle {
    display: flex;
    position: relative;
    overflow: hidden;
    flex-direction: row;
    align-items: flex-start;
    justify-content: start;
    color: #797878;
    font-size: 0.9rem;
    font-weight: 500;
    height: 2.25rem;
  }

  .HDXWorkbenchNavigatorHeaderTop-WorkspaceSwitch {
    position: relative;
    width: 2.5rem;
    display: none;
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &.expanded {
      display: flex;
    }
  }
</style>
