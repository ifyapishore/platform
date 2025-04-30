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
    healthy
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
    width: 100%;

    cursor: pointer;
    color: var(--theme-navpanel-text);

    &:hover {
      background-color: rgb(131 176 184 / 10%);
    }
  }

  .HDXWorkspaceSelectorItem-Status {
    width: 4.25rem;
    /* text-align: right; */
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.5rem;
    font-size: 0.5rem;
    border-right: solid 0.5px #888;  }

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
