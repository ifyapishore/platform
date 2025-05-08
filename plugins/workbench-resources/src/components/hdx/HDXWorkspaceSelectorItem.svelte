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
  export let onSelect: (e: MouseEvent) => void
  export let selected: boolean
</script>

<button
  class="HDXWorkspaceSelectorItem"
  class:selected={selected}
  on:click={onSelect}
  >

  <div class="HDXWorkspaceSelectorItem-Status">
    h
  </div>

  <div class="HDXWorkspaceSelectorItem-Body">
    <div class="HDXWorkspaceSelectorItem-Body-Content">
      {name}
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

    &:hover {
      background-color: var(--hdx-workspace-panel-hover-bg-color);
    }
  }

  .HDXWorkspaceSelectorItem-Status {
    position: relative;
    min-width: var(--app-panel-width);
    max-width: var(--app-panel-width);
    width: var(--app-panel-width);
    /* text-align: right; */
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.5rem;

    &::before {
      position: absolute;
      content: '';
      display: block;
      width: 0px;
      height: 50%;
      top: 25%;
      right: 0;
      border-left: solid 0.5px rgba(0,0,0,0.5);
      border-right: solid 0.5px rgaba(255,255,255,0.5);
    }
  }

  .HDXWorkspaceSelectorItem-Body {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
  }

  .HDXWorkspaceSelectorItem-Body-Content {
    display: flex;
    flex-grow: 1;
    align-items: center;
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }

  .HDXWorkspaceSelectorItem-Body-Check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
  }
</style>
