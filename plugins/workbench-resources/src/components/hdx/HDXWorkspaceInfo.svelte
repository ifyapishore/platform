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
  import presentation, { isAdminUser } from '@hcengineering/presentation'
  import { Label, Loading } from '@hcengineering/ui'

  import { formatBackupSize, formatLastVisitDays } from '../../utils'
  import HDXWorkspaceInfoItem from './HDXWorkspaceInfoItem.svelte'
  import type { IWorkbenchUiModel } from './HDXWorkspaceModel'

  // Props
  export let workbenchUiModel: IWorkbenchUiModel

  // Rendering shortcuts
  $: isAdmin = isAdminUser()

  $: ws = workbenchUiModel.currentWorkspace
  $: itemRegionShow = $ws?.region != null && $ws.region !== ''
  $: itemRegionValue = itemRegionShow ? $ws?.region : 'N/A'

  $: itemLastUsageShow = isAdmin && $ws?.lastVisit != null && $ws.lastVisit !== 0
  $: itemLastUsageValue = itemLastUsageShow ? formatLastVisitDays($ws) : 'N/A'

  $: itemBackupShow = $ws?.backupInfo != null
  $: itemBackupValue = itemBackupShow ? formatBackupSize($ws) : 'N/A'

  $: itemUrlShow = true
  $: itemUrlValue = itemUrlShow ? $ws?.url : 'N/A'
  $: archivingMode = isArchivingMode($ws?.mode)
</script>

{#if ws}
  <div class="HDXWorkspaceInfo">
    <HDXWorkspaceInfoItem title="Status" on={archivingMode}>
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
{:else}
  <Loading />
{/if}

<style lang="scss">
  .HDXWorkspaceInfo {
    cursor: default;
    user-select: text;
  }
</style>
