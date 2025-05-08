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
  import { IconCheck } from '@hcengineering/ui'

  export let name: string
  export let description: string
  export let onSelect: (e: MouseEvent) => void
  export let selected: boolean
</script>

<button
  class="HDXWorkspaceSelectorItem"
  class:selected={selected}
  on:click={onSelect}
  >

  <div class="HDXWorkspaceSelectorItem-Status">
    <div class={'HDXWorkspaceSelectorItem-StatusMarker'} />
  </div>

  <div class="HDXWorkspaceSelectorItem-Body">
    <div class="HDXWorkspaceSelectorItem-Header">
      <div class="HDXWorkspaceSelectorItem-Header-Title">{name}</div>
      <div class="HDXWorkspaceSelectorItem-Header-Subtitle">{description}</div>
    </div>
    <div class="HDXWorkspaceSelectorItem-Body-Check">
      {#if selected}
        <IconCheck size={'small'} />
      {/if}
    </div>
  </div>
</button>

<style lang="scss">

  .HDXWorkspaceSelectorItem {
    display: flex;
    flex-direction: row;
    height: 3rem;
    align-items: stretch;
    width: calc(100%);

    cursor: pointer;
    color: var(--theme-hdx-workbench-navigator-text-color);
    height: var(--app-panel-big-action-height);

    background-color: transparent;

    &:hover {
      background-color: var(--hdx-workspace-panel-hover-bg-color);
    }
  }

  .HDXWorkspaceSelectorItem-Status {
    position: relative;
    min-width: var(--app-panel-width);
    max-width: var(--app-panel-width);
    width: var(--app-panel-width);
    height: var(--app-panel-big-action-height);
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.5rem;
  }

  .HDXWorkspaceSelectorItem-StatusMarker {
    display: block;
    width: 40%;
    height: 40%;
    border-radius: 20%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .HDXWorkspaceSelectorItem-Body {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
  }

  .HDXWorkspaceSelectorItem-Header {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: stretch;
    height: var(--app-panel-big-action-height);
  }

  .HDXWorkspaceSelectorItem-Header-Title,
  .HDXWorkspaceSelectorItem-Header-Subtitle {
    display: flex;
    flex-grow: 1;
    color: var(--theme-hdx-workbench-navigator-text-color);
    justify-content: flex-start;
    overflow: hidden;
    text-shadow: 1px 1px 1px var(--theme-hdx-workbench-navigator-text-shadow-color);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .HDXWorkspaceSelectorItem-Header-Title {
    height: calc(var(--app-panel-big-action-height) * 0.5);
    font-size: var(--font-size-small);
    font-weight: bold;
    align-items: flex-end;
  }

  .HDXWorkspaceSelectorItem-Header-Subtitle {
    height: calc(var(--app-panel-big-action-height) * 0.5);
    font-size: var(--font-size-small);
    align-items: flex-start;
  }

  .HDXWorkspaceSelectorItem-Body-Check {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--app-panel-big-action-height);
    width: 2rem;
  }
</style>
