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
  import core, { getCurrentAccount, type Ref } from '@hcengineering/core'
  import type { Application } from '@hcengineering/workbench'
  import { createQuery } from '@hcengineering/presentation'
  import workbench from '@hcengineering/workbench'
  import { hideApplication, isAppAllowed, showApplication } from '../../utils'
  import { Loading, IconCheck, Label, Icon } from '@hcengineering/ui'
  // import Drag from './icons/Drag.svelte'

  export let apps: Application[] = []

  export let toggleAppMenuEditMode: () => void

  let activeElement: HTMLElement
  const btns: HTMLElement[] = []

  function focusTarget (target: HTMLElement): void {
    activeElement = target
  }

  let loaded: boolean = false
  let hiddenAppsIds: Array<Ref<Application>> = []
  const hiddenAppsIdsQuery = createQuery()
  hiddenAppsIdsQuery.query(
    workbench.class.HiddenApplication,
    {
      space: core.space.Workspace
    },
    (res) => {
      hiddenAppsIds = res.map((r) => r.attachedTo)
      loaded = true
    }
  )

  const me = getCurrentAccount()

  const filteredApps = apps.filter(
    (it) => !hiddenAppsIds.includes(it._id) && isAppAllowed(it, me) && it.position !== 'top'
  )
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
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

  {#if loaded}
    {#each filteredApps as app, i}
      <button
        bind:this={btns[i]}
        class="ap-menuItem withIcon flex-row-center flex-grow"
        class:hover={btns[i] === activeElement}
        on:click={() => {
          if (hiddenAppsIds.includes(app._id)) showApplication(app)
          else hideApplication(app)
        }}
        on:mousemove={() => {
          focusTarget(btns[i])
        }}
      >
        <div class="icon mr-2"><Icon icon={app.icon} size={'small'} /></div>
        <span class="label overflow-label flex-grow"><Label label={app.label} /></span>
        <div class="ap-check">
          {#if !hiddenAppsIds.includes(app._id)}
            <IconCheck size={'small'} />
          {/if}
        </div>
      </button>
    {/each}
  {:else}
    <Loading />
  {/if}
</div>

<style lang="scss">
  .HDXMoreApps {
    background-color: rgba(255, 255, 255, 0.01);
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
</style>
