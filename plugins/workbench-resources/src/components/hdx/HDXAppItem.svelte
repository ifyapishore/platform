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
  export let noLabel: boolean = false
  export let icon: Asset | AnySvelteComponent
  export let selected: boolean = false
  export let kind: 'default' | 'positive' | 'negative' | 'warning' | 'accented' = 'default'
  export let loading: boolean = false
  export let notify: boolean = false
  export let navigator: boolean = false
  export let appsMini: boolean
  export let expanded: Writable<boolean>
</script>

<button
  class="HDXAppItem {kind}"
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
    <div class="HDXAppItem-Icon" class:noty={notify}>
      <Icon {icon} size={appsMini ? 'small' : 'medium'} />
      {#if notify}<div class="marker" />{/if}
    </div>
    {#if !noLabel}
    <div class="HDXAppItem-Label" class:selected class:expanded={$expanded}>
      <Label label={label}/>
    </div>
    {/if}
  {/if}
</button>

<style lang="scss">
  .HDXAppItem {
    display: flex;
    position: relative;
    padding: 0;
    margin: 0;
    outline: none;
    border: none;

    flex-direction: row;
    align-self: stretch;
    width: 100%;
    height: var(--app-panel-action-height);

    background-color: transparent;
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

  .HDXAppItem-Icon {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: var(--app-panel-width);
    max-width: var(--app-panel-width);
    width: var(--app-panel-width);
    height: var(--app-panel-action-height);
    color: var(--theme-navpanel-icons-color);
    // background-color: red;
  }

  .HDXAppItem-Label {
    display: none;
    flex: 1;
    height: var(--app-panel-action-height);
    align-items: center;
//    padding-left: 0.5rem;
    font-size: var(--font-size-small);
    color: var(--theme-hdx-workbench-navigator-text-color);
    text-align: left;
    overflow: hidden;
    text-shadow: 1px 1px 1px var(--theme-hdx-workbench-navigator-text-shadow-color);
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
