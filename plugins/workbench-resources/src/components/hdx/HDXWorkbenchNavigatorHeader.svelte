<script lang="ts">
  import Logo from '../Logo.svelte'
  import HDXWorkspaceSwitch from './icons/HDXWorkspaceSwitch.svelte'
  import HDXWorkspaceInfo from './HDXWorkspaceInfo.svelte'
  import HDXWorkspaceColorPicker from './HDXWorkspaceColorPicker.svelte'
  import type { IWorkbenchUiModel } from './HDXWorkspaceModel'

  // Props
  export let windowWorkspaceName: string
  export let workbenchUiModel: IWorkbenchUiModel

  // Rendering shortcuts
  $: expandedWorkspaces = workbenchUiModel.isWorkspaceMode
  $: workspaceColor = workbenchUiModel.workspaceColor
  $: appsMini = workbenchUiModel.appsMini
</script>

<div
  class="HDXWorkbenchNavigatorHeader panel-theme-{$workspaceColor} no-print"
  class:expanded={workbenchUiModel.isExpanded}
  class:expandedWorkspace={$expandedWorkspaces}
>
  <div
  class="HDXWorkbenchNavigatorHeaderTop"
  class:expanded={workbenchUiModel.isExpanded}
  class:expandedWorkspace={$expandedWorkspaces}
  role="presentation"
  on:click={workbenchUiModel.toggleWorkspaceMode}
  >
    <div
      class="HDXWorkbenchNavigatorHeaderTop-Logo"
      class:expanded={workbenchUiModel.isExpanded}
      >
      <Logo mini={$appsMini} workspace={windowWorkspaceName} />
    </div>
    <div
      class="HDXWorkbenchNavigatorHeaderTop-Workspace"
      class:expanded={workbenchUiModel.isExpanded}>
        <div
        class="HDXWorkbenchNavigatorHeaderTop-Workspace-Title"
        class:expanded={workbenchUiModel.isExpanded}>
        My Workspace
      </div>
      <div
        class="HDXWorkbenchNavigatorHeaderTop-Workspace-Subtitle"
        class:expanded={workbenchUiModel.isExpanded}>
        {windowWorkspaceName}
      </div>
    </div>
    <div
      class="HDXWorkbenchNavigatorHeaderTop-WorkspaceSwitch"
      class:expanded={workbenchUiModel.isExpanded}>
      <HDXWorkspaceSwitch expandedWorkspaces={$expandedWorkspaces} size="medium"/>
    </div>
  </div>
  {#if $expandedWorkspaces}
    <HDXWorkspaceInfo {workbenchUiModel}/>
    <HDXWorkspaceColorPicker
      workspaceColor={$workspaceColor}
      onChange={ (colorNumber) => { workbenchUiModel.setWorkspaceColor(colorNumber) } }
      />
  {/if}
</div>

<style lang="scss">
  .HDXWorkbenchNavigatorHeader {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;

    &.expanded {
      // background-color:rgb(131 176 184 / 10%); /* rgba(255,255,255,0.1); */
      box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.05);
      &.expandedWorkspace {
        box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.05);
        margin-bottom: 1rem;
        padding-bottom: 0.25rem;
      }

      &.panel-theme-1 {
        background-color: var(--hdx-workspace-panel-header-bg-color-1);
      }
      &.panel-theme-2 {
        background-color: var(--hdx-workspace-panel-header-bg-color-2);
      }
      &.panel-theme-3 {
        background-color: var(--hdx-workspace-panel-header-bg-color-3);
      }
      &.panel-theme-4 {
        background-color: var(--hdx-workspace-panel-header-bg-color-4);
      }
      &.panel-theme-5 {
        background-color: var(--hdx-workspace-panel-header-bg-color-5);
      }
    }
  }

  .HDXWorkbenchNavigatorHeaderTop {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 4.5rem;
    width: 100%;
    cursor: pointer;
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
    opacity: 0.5;
    font-size: 0.6rem;
    text-transform: uppercase;
    height: 2.2rem;
    color: var(--hdx-workspace-panel-header-color);
  }

  .HDXWorkbenchNavigatorHeaderTop-Workspace-Subtitle {
    display: flex;
    position: relative;
    overflow: hidden;
    flex-direction: row;
    align-items: flex-start;
    justify-content: start;
    font-size: 0.9rem;
    font-weight: 500;
    height: 2.25rem;
    color: var(--hdx-workspace-panel-header-color);
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
