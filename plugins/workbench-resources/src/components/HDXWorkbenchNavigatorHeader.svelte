<script lang="ts">
  import Logo from './Logo.svelte'
  import HDXWorkspaceSwitch from './icons/HDXWorkspaceSwitch.svelte'

  export let windowWorkspaceName: string
  export let expanded: boolean

  const appsMini = false

  // $: debugTitle = expanded ? 'yes' : 'no'

  //
  function toggleWorkspace (event: MouseEvent): void {
    event.stopPropagation()
    event.preventDefault()
  }
</script>

<div
  class="HDXWorkbenchNavigatorHeader"
  class:expanded={expanded}
  role="presentation"
  on:click={toggleWorkspace}
>
  <div
    class="HDXWorkbenchNavigatorHeader-Logo"
    class:expanded={expanded}
    role="presentation"
  >
    <Logo mini={appsMini} workspace={windowWorkspaceName} />
  </div>
  <div
    class="HDXWorkbenchNavigatorHeader-Workspace"
    class:expanded={expanded}
    role="presentation"
    on:click={toggleWorkspace}>
      <div
      class="HDXWorkbenchNavigatorHeader-Workspace-Title"
      class:expanded={expanded}
      role="presentation"
      on:click={toggleWorkspace}>
      Workspace
    </div>
    <div
      class="HDXWorkbenchNavigatorHeader-Workspace-Subtitle"
      class:expanded={expanded}
      role="presentation"
      on:click={toggleWorkspace}>
      {windowWorkspaceName}
    </div>
  </div>
  <div
    class="HDXWorkbenchNavigatorHeader-WorkspaceSwitch"
    class:expanded={expanded}
    role="presentation"
    on:click={toggleWorkspace}>
    <HDXWorkspaceSwitch expanded={expanded} size="medium" />
  </div>
</div>

<style>
  .HDXWorkbenchNavigatorHeader {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 4.5rem;
    width: 100%;

    &.expanded {
      background-color:rgb(131 176 184 / 10%); /* rgba(255,255,255,0.1); */
      box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.05);
    }
  }

  .HDXWorkbenchNavigatorHeader-Logo {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    min-width: var(--app-panel-width);
    width: var(--app-panel-width);
    max-width: var(--app-panel-width);
  }

  .HDXWorkbenchNavigatorHeader-Workspace {
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

  .HDXWorkbenchNavigatorHeader-Workspace-Title {
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

  .HDXWorkbenchNavigatorHeader-Workspace-Subtitle {
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

  .HDXWorkbenchNavigatorHeader-WorkspaceSwitch {
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
