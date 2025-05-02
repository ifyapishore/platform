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
  import { getCurrentAccount, type Ref } from '@hcengineering/core'
  import type { Application } from '@hcengineering/workbench'
  import { isAppAllowed, showApplication } from '../../utils'
  import HDRAppItem from './HDXAppItem.svelte'

  export let apps: Application[] = []
  export let toggleAppMenuEditMode: () => void
  export let expanded: boolean
  export let appMenuEditMode: boolean

  export let hiddenAppsIds: Array<Ref<Application>> = []

    const me = getCurrentAccount()
  $: filteredApps = apps.filter(
    (it) => hiddenAppsIds.includes(it._id) && isAppAllowed(it, me) && it.position !== 'top'
  )
</script>

<div class="HDXMoreApps">
  <div class="HDXMoreAppsHeader">
    <div class="HDXMoreAppsHeader-Title">
      The rest...
    </div>
    <button class="HDXMoreAppsHeader-Action" on:click={toggleAppMenuEditMode}>
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
    <HDRAppItem
      expanded={expanded}
      addIcon={true}
      editMode={appMenuEditMode}
      icon={app.icon}
      label={app.label}
      appsMini={false}
      navigator={false}
      onToogleApp={() => {
        showApplication(app)
      }}/>
    {/each}
  </div>
</div>

<style lang="scss">
  .HDXMoreApps {
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
    text-transform: uppercase;
    padding-left: 4.2rem;

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
    font-size: 0.6em;
    font-weight: 800;
    padding-left: 0.1rem;
  }

  .HDXMoreAppsHeader-Action {
    display: flex;
    width: 3rem;
    align-items: center;
    justify-content: center;
    color: rgb(102 142 131 / 50%);
    pointer-events: visible;
    cursor: pointer;

    &:hover {
      color: rgb(102 142 131 / 100%);
    }
  }

  .HDXMoreAppsList {
    min-height: 2rem;
    margin-bottom: 2rem;
  }
</style>
