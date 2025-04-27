<script lang="ts">
  import Logo from './Logo.svelte'

  export let windowWorkspaceName: string
  export let expanded: boolean

  const appsMini = false

  // $: debugTitle = expanded ? 'yes' : 'no'

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
    {windowWorkspaceName}
  </div>
</div>

<style>
  .HDXWorkbenchNavigatorHeader {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 4.5rem;
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
    flex-grow: 1;
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    
    &.expanded {
      display: flex;
    }
  }

</style>
