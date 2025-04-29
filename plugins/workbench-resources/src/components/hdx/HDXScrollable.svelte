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

  export let loading: boolean = false
  export let expanded: Writable<boolean>
</script>

<div
  class="HDXScrollable"
  class:loading
  class:expanded={$expanded}
  id={'hdx-scrollable'}
>
  <div
    class="HDXScrollable-Inner"
    class:loading
    class:expanded={$expanded}
    id={'hdx-scrollable'}
  >
    <slot/>
  </div>
</div>

<style lang="scss">
  .HDXScrollable {
    display: flex;
    position: relative;
    padding: 0;
    margin: 0;
    outline: none;
    border: none;
    width: 100%;
    flex-grow: 1;

    &.loading {
      pointer-events: none;
    }
  }

  .HDXScrollable-Inner {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
  }
</style>
