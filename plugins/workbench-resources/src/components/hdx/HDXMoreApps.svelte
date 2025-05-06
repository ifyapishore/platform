<!--
// Copyright © 2022 Hardcore Engineering Inc.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { getCurrentAccount, type Ref } from '@hcengineering/core'
  import type { Application } from '@hcengineering/workbench'
  import { isAppAllowed, showApplication } from '../../utils'
  import HDRAppItem from './HDXAppItem.svelte'
  import { NavLink } from '@hcengineering/view-resources'
  import type { IWorkbenchUiModel } from './HDXWorkspaceModel'

  // Props
  export let workbenchUiModel: IWorkbenchUiModel

  export let active: Ref<Application> | undefined
  export let apps: Application[] = []
  export let hiddenAppsIds: Array<Ref<Application>> = []

  const dispatch = createEventDispatcher()
  const me = getCurrentAccount()

  // Rendering shortcuts
  $: expanded = workbenchUiModel.isExpanded
  $: appMenuEditMode = workbenchUiModel.isAppsEditMode
  // $: expandedWorkspaces = workbenchUiModel.isWorkspaceMode

  $: filteredApps = apps.filter(
    (it) => hiddenAppsIds.includes(it._id) && isAppAllowed(it, me) && it.position !== 'top'
  )
</script>

<div class="HDXMoreApps">
  <div class="HDXMoreAppsHeader" class:expanded={$expanded} class:collapsed={!$expanded}>
    <div class="HDXMoreAppsHeader-Title" class:expanded={$expanded} class:collapsed={!$expanded}>
      Huly apps
    </div>
    <button class="HDXMoreAppsHeader-Action" class:expanded={$expanded} class:collapsed={!$expanded} on:click={workbenchUiModel.toggleAppsEditMode}>
      <svg
            viewBox="0 0 24 24"
            width="24" height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
        <line x1="4" y1="6" x2="20" y2="6" />
        <circle cx="14" cy="6" r="2" />

        <line x1="4" y1="12" x2="20" y2="12" />
        <circle cx="8" cy="12" r="2" />

        <line x1="4" y1="18" x2="20" y2="18" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    </button>
  </div>

  <div class="HDXMoreAppsList">
    {#each filteredApps as app}
    <NavLink app={app.alias} shrink={0} disabled={app._id === active || $appMenuEditMode}>
      <HDRAppItem
      expanded={$expanded}
      addIcon={true}
      editMode={$appMenuEditMode}
      icon={app.icon}
      label={app.label}
      appsMini={false}
      selected={app._id === active}
      on:click={() => {
        if (app._id === active) dispatch('toggleNav')
      }}

      on:click={() => {
        if ($appMenuEditMode) {
          showApplication(app)
        }
      }}/>
      </NavLink>
    {/each}
  </div>
</div>

<style lang="scss">
  .HDXMoreApps {
    display: block;
    // background-color: rgba(255, 255, 255, 0.01);
  }

  .HDXMoreAppsHeader {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 3rem;
    font-size: 1rem;

    &.collapsed {
      padding-left: 0rem;
    }
    &.expanded {
      padding-left: 0rem;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.01);
    }

    &:before {
      content: '';
      position: absolute;
      pointer-events: none;
      top: 0;
      left: -2rem;
      right: -2rem;
      bottom: -2rem;
      box-shadow: inset 10px 0 10px rgba(0, 0, 0, 0.05);
    }
  }

  .HDXMoreAppsHeader-Title {
    display: flex;
    flex-grow: 1;
    align-items: center;
    font-size: 0.7rem;
    font-weight: 800;
    padding-left: 1.3rem;

    &.collapsed {
      display: none;
    }
    &.expanded {
      display: flex;
    }
  }

  .HDXMoreAppsHeader-Action {
    display: flex;
    min-width: 3rem;
    max-width: 3rem;
    width: 3rem;
    align-items: center;
    justify-content: center;
    color: rgb(102 142 131 / 50%);
    pointer-events: visible;
    cursor: pointer;

    &:hover {
      color: rgb(102 142 131 / 100%);
    }
    &.collapsed {
      min-width: var(--app-panel-width);
      max-width: var(--app-panel-width);
      width: var(--app-panel-width);
    }
    &.expanded {
      min-width: 3rem;
      max-width: 3rem;
      width: 3rem;
    }
  }

  .HDXMoreAppsList {
    min-height: 2rem;
    margin-bottom: 2rem;
  }
</style>
