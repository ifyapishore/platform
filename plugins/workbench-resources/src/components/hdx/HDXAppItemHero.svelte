<!--
// Copyright © 2020 Anticrm Platform Contributors.
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
  import type { Asset, IntlString } from '@hcengineering/platform'
  import type { AnySvelteComponent } from '@hcengineering/ui'
  import { Icon, Loading, tooltip, Label } from '@hcengineering/ui'
  import { Writable } from 'svelte/store'

  export let label: IntlString
  export let selected: boolean = false
  export let loading: boolean = false
  export let notify: boolean = false
  export let navigator: boolean = false
  export let appsMini: boolean
  export let expanded: Writable<boolean>
    // icon={notification.icon.Notifications}

</script>

<button
  class="HDXAppItemHero"
  class:loading
  class:selected
  class:expanded={$expanded}
  class:navigator
  id={'app-' + label}
  disabled={loading}
  on:click
>
  {#if loading}
    <Loading />
  {:else}
    <div class="HDXAppItemHero-Icon" class:expanded={$expanded}>
      <!-- EnvelopeIcon.svelte -->
      <svg
        viewBox="0 0 24 24" width="32" height="24"
        fill="none" stroke="currentColor"
        stroke-width="1" stroke-linecap="round" stroke-linejoin="round">

          <!-- top -->
          <path d="M3 4 Q8 12 18 12" />
          <!-- down -->
          <path d="M4 20 Q8 12 18 12" />
          <!-- eye -->
          <path d="M5 9 Q4 12 6 15" />

          <!-- above -->
          <path d="M6 5 Q9 10 19 10"
          stroke-width="0.02"
          stroke-dasharray="3 2 1" />

          <!-- eye brove lline-->
          <polyline points="18 12 22 12"
          stroke-width="0.55"/>

          <!-- the point -->
          <rect
            x="10" y="4"
            rx="1" ry="1"
            stroke-width="0.05"
            width="8" height="1.5"
            />
        </svg>
      </div>
    <div class="HDXAppItemHero-Label" class:selected class:expanded={$expanded}>
      <!-- <Label label={label}/> -->
      Talks
    </div>
  {/if}
</button>

<style lang="scss">
  .HDXAppItemHero {
    display: flex;
    position: relative;
    padding: 0;
    margin: 0;
    outline: none;
    border: none;

    flex-direction: row;
    width: 100%;
    height: calc(var(--app-panel-action-height) * 1.5);
    margin-bottom: 0.5rem;

    background-color: transparent;
    // background: linear-gradient(45deg, rgb(159 195 197 / 50%), rgb(159 195 197 / 30%), rgb(159 195 197 / 75%));
    // background-color: violet;
    cursor: pointer;

    &.loading {
      pointer-events: none;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &.selected {
      background-color: rgba(0, 0, 0, 0.05);
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  .HDXAppItemHero-Icon {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: var(--app-panel-width);
    max-width: var(--app-panel-width);
    width: var(--app-panel-width);
    height: var(--app-panel-action-height);
    color: var(--theme-navpanel-icons-color);
    transform: rotate(180deg);

    &.expanded {
      opacity: 1;
    }
  }

  .HDXAppItemHero-Label {
    display: none;
    flex: 1;
    height: calc(var(--app-panel-action-height) * 1.4);
    align-items: center;
    font-size: 0.78rem;
    font-weight: 600;
    // padding-left: 0.2rem;
    color: var(--theme-hdx-workbench-navigator-text-color);
    text-align: left;
    overflow: hidden;
    text-shadow: 1px 1px 1px var(--theme-hdx-workbench-navigator-text-shadow-color);
    // text-transform: uppercase;

    &.expanded {
      display: flex;
    }
  }

  .marker {
    position: absolute;
    top: 1.1rem;
    right: 0.375rem;
    width: 0.425rem;
    height: 0.425rem;
    border-radius: 50%;
    background-color: var(--highlight-red);
  }
</style>
