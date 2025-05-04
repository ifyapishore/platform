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
export let title: string
export let on: boolean
</script>

{#if on}
<div class="HDXWorkspaceInfoItem">
  <div class="HDXWorkspaceInfoItem-Label">
    {title}
  </div>
  <div class="HDXWorkspaceInfoItem-Value">
    <slot/>
  </div>
</div>
{/if}

<style lang="scss">
  .HDXWorkspaceInfoItem {
    display: flex
;
    flex-direction: row;
    height: 1rem;
    align-items: stretch;
    margin-left: 4.3rem;
    font-size: 0.75rem;
    margin-bottom: 2px;
    cursor: default;
    user-select: text;
    color: var(--hdx-workspace-panel-header-info-color)
  }

  .HDXWorkspaceInfoItem-Label {
    display: flex;
    align-items: center;
    width: 4rem;
    border-right: solid 0.5px rgba(255, 255, 255, 0.1);
  }

  .HDXWorkspaceInfoItem-Value {
    display: flex;
    align-items: center;
    flex-grow: 1;
    border-left: solid 0.5px rgba(0, 0, 0, 0.1);
    padding-left: 0.3rem;
}
</style>
