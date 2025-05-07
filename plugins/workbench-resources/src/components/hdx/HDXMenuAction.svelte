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
  import { Icon, Label } from '@hcengineering/ui'

  export let label: IntlString
  export let description: IntlString
  export let icon: Asset | AnySvelteComponent
</script>

<button
  class="HDXMenuAction"
  id={'app-' + label}
  on:click
>
  <div class="HDXMenuAction-Icon">
    <Icon {icon} size={'medium'} />
  </div>

  <div class="HDXMenuAction-Label">
    <Label label={label}/>
    <Label label={description}/>
  </div>
</button>

<style lang="scss">
  .HDXMenuAction {
    display: flex;
    position: relative;
    padding: 0;
    margin: 0;
    outline: none;
    border: none;

    flex-direction: row;
    width: 100%;
    height: var(--app-panel-action-height);

    background-color: transparent;
    // background-color: violet;
    cursor: pointer;

    &:hover {
      background-color: var(--hdx-workspace-panel-hover-bg-color);
    }
  }

  .HDXMenuAction-Icon {
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

  .HDXMenuAction-Label {
    display: flex;
    flex: 1;
    height: var(--app-panel-action-height);
    align-items: center;
//    padding-left: 0.5rem;
    font-size: var(--font-size-small);
    color: var(--theme-hdx-workbench-navigator-text-color);
    text-align: left;
    overflow: hidden;
    text-shadow: 1px 1px 1px var(--theme-hdx-workbench-navigator-text-shadow-color);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
