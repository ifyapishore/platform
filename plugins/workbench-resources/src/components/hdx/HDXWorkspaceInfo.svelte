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
  import { isArchivingMode } from '@hcengineering/core'
  import login from '@hcengineering/login'
  import { getMetadata, getResource } from '@hcengineering/platform'
  import presentation, { decodeTokenPayload, isAdminUser } from '@hcengineering/presentation'
  import {
    Icon,
    IconCheck,
    Label,
    Loading,
    Location,
    SearchEdit,
    Status,
    closePopup,
    fetchMetadataLocalStorage,
    getCurrentLocation,
    isSameSegments,
    locationStorageKeyId,
    locationToUrl,
    navigate,
    resolvedLocationStore,
    ticker
  } from '@hcengineering/ui'
  import { workbenchId } from '@hcengineering/workbench'
  import { onDestroy, onMount } from 'svelte'

  import { workspacesStore, formatBackupSize, formatLastVisitDays } from '../../utils'
  import HDXWorkspaceInfoItem from './HDXWorkspaceInfoItem.svelte'
  // import Drag from './icons/Drag.svelte'

  onMount(() => {
    void getResource(login.function.GetWorkspaces).then(async (f) => {
      $workspacesStore = await f()
    })
  })

  $: isAdmin = isAdminUser()

  $: ws = $workspacesStore.find((ws) => $resolvedLocationStore.path[1] === ws.url)
  $: itemRegionShow = ws?.region != null && ws.region !== ''
  $: itemRegionValue = itemRegionShow ? ws?.region : 'N/A'

  $: itemLastUsageShow = isAdmin && ws?.lastVisit != null && ws.lastVisit !== 0
  $: itemLastUsageValue = itemLastUsageShow ? formatLastVisitDays(ws) : 'N/A'

  $: itemBackupShow = ws?.backupInfo != null
  $: itemBackupValue = ws?.backupInfo != null ? formatBackupSize(ws) : 'N/A'
  $: itemUrlShow = true
  $: itemUrlValue = itemUrlShow ? ws?.url : 'N/A'
</script>

{#if ws}
  <div>
    <div>
        <HDXWorkspaceInfoItem title="Status" on={isArchivingMode(ws.mode)}>
          <Label label={presentation.string.Archived} />
        </HDXWorkspaceInfoItem>

        <HDXWorkspaceInfoItem title="Region" on={itemRegionShow}>
          {itemRegionValue}
        </HDXWorkspaceInfoItem>

        <HDXWorkspaceInfoItem title="Last use" on={itemLastUsageShow}>
          {itemLastUsageValue}
        </HDXWorkspaceInfoItem>

        <HDXWorkspaceInfoItem title="Backup" on={itemBackupShow}>
          {itemBackupValue}
        </HDXWorkspaceInfoItem>

        <HDXWorkspaceInfoItem title="ID" on={itemBackupShow}>
          {itemUrlValue}
        </HDXWorkspaceInfoItem>
    </div>
  </div>
{:else}
  <Loading />
{/if}

<style lang="scss">
</style>
