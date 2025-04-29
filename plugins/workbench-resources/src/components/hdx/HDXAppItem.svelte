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

  export let label: IntlString
  export let noLabel: boolean = false
  export let icon: Asset | AnySvelteComponent
  export let selected: boolean = false
  export let kind: 'default' | 'positive' | 'negative' | 'warning' | 'accented' = 'default'
  export let loading: boolean = false
  export let notify: boolean = false
  export let navigator: boolean = false
  export let appsMini: boolean

console.log('HDXAppItem', { label })
</script>

{#if navigator}
  <style>
    .HDXAppItem {
      padding: 0.5rem 1rem;
      background-color: var(--theme-navpanel-background-color);
      border-radius: 0.5rem;
    }
  </style>
{/if}
<button
  class="HDXAppItem {kind}"
  class:loading
  class:selected
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
    <div class="HDXAppItem-Label">
      <Label label={label}/>
    </div>
    {/if}
  {/if}
</button>

<style lang="scss">
  .HDXAppItem {
    position: relative;
    flex-direction: row;
    width: 100%;
    height: 2.5rem;
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
    background-color: transparent;
    cursor: pointer;
    outline: none;

    &.loading {
      pointer-events: none;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .HDXAppItem-Icon {
    width: 4.5rem;
    height: 1.25rem;
    color: var(--theme-navpanel-icons-color);
  }

  .HDXAppItem-Label {
    flex: 1;
    margin-left: 0.5rem;
    font-size: var(--font-size-small);
    color: var(--theme-navpanel-icons-color);
    text-align: left;
    overflow: hidden;
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
