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
  import HelpAndSupport from '../HelpAndSupport.svelte'
  import { WorkspaceInfoWithStatus } from '@hcengineering/core'
  import login from '@hcengineering/login'
  import { getMetadata, getResource } from '@hcengineering/platform'
  import presentation, { decodeTokenPayload, isAdminUser } from '@hcengineering/presentation'
  import setting, { SettingsCategory, settingId } from '@hcengineering/setting'
  import HDXMenuAction from './HDXMenuAction.svelte'
  import support, { docsLink, reportBugLink, supportLink, privacyPolicyLink } from '@hcengineering/support'
  import { i18nt } from './ux-dev'
  import {
    Loading,
    Location,
    SearchEdit,
    closePopup,
    closeTooltip,
    fetchMetadataLocalStorage,
    getCurrentLocation,
    isSameSegments,
    locationStorageKeyId,
    locationToUrl,
    navigate,
    resolvedLocationStore,
    showPopup,
    ticker
  } from '@hcengineering/ui'
  import {
    AccountRole,
    DocumentQuery,
    Ref,
    SortingOrder,
    Space,
    getCurrentAccount,
    hasAccountRole,
    notEmpty,
    AccountUuid
  } from '@hcengineering/core'
  import { workbenchId } from '@hcengineering/workbench'
  import { onDestroy, onMount } from 'svelte'

  import { workspacesStore } from '../../utils'
  import HDXScrollable from './HDXScrollable.svelte'
  import HDXWorkspaceSelectorItem from './HDXWorkspaceSelectorItem.svelte'
  import type { IWorkbenchUiModel } from './HDXWorkspaceModel'
  import Icon from '@hcengineering/ui/src/components/Icon.svelte'
  import Label from '@hcengineering/ui/src/components/Label.svelte'

    // Props
  export let workbenchUiModel: IWorkbenchUiModel

  onMount(() => {
    void getResource(login.function.GetWorkspaces).then(async (f) => {
      $workspacesStore = await f()
    })
  })

  function getWorkspaceLink (ws: WorkspaceInfoWithStatus): string {
    const loc: Location = {
      path: [workbenchId, ws.url]
    }
    return locationToUrl(loc)
  }

  async function clickHandler (e: MouseEvent, wsUrl: string): Promise<void> {
    if (!e.metaKey && !e.ctrlKey) {
      e.preventDefault()
      closeTooltip()
      closePopup()
      const current = getCurrentLocation()
      if (wsUrl !== current.path[1]) {
        let last: Location | undefined
        try {
          last = JSON.parse(localStorage.getItem(`${locationStorageKeyId}_${wsUrl}`) ?? '')
        } catch (err: any) {
          // Ignore
        }
        if (last != null && isSameSegments(last, current, 2)) {
          navigate(last)
        } else {
          navigate({ path: [workbenchId, wsUrl] })
        }
      }
    }
    // notify ui about select action in all cases
    workbenchUiModel.onWorkspaceSelected()
  }

  let activeElement: HTMLElement
  const btns: HTMLElement[] = []

  function focusTarget (target: HTMLElement): void {
    activeElement = target
  }

  $: isAdmin = isAdminUser()

  let search: string = ''

  const _endpoint: string = fetchMetadataLocalStorage(login.metadata.LoginEndpoint) ?? ''
  const token: string = getMetadata(presentation.metadata.Token) ?? ''

  let endpoint = _endpoint.replace(/^ws/g, 'http')
  if (endpoint.endsWith('/')) {
    endpoint = endpoint.substring(0, endpoint.length - 1)
  }
  const account = getCurrentAccount()

  let data: any
  onDestroy(
    ticker.subscribe(() => {
      void fetch(endpoint + `/api/v1/statistics?token=${token}`, {})
        .then(async (json) => {
          data = await json.json()
        })
        .catch((err) => {
          console.error(err)
        })
    })
  )

  $: activeSessions =
    (data?.statistics?.activeSessions as Record<
    string,
    Array<{
      userId: string
      data?: Record<string, any>
    }>
    >) ?? {}

    function inviteWorkspace (): void {
      showPopup(login.component.InviteLink, {})
    }
</script>

<div class="HDXWorkspaceSelector">
  <HDXScrollable>

    {#if hasAccountRole(account, AccountRole.User)}
    <HDXMenuAction
      on:click={ () => { inviteWorkspace() } }
      icon={setting.icon.InviteWorkspace}
      label={i18nt('Invite')}
      description={i18nt('Send a link to join')}/>

    <HDXMenuAction
      on:click={ () => { inviteWorkspace() } }
      icon={setting.icon.Setting}
      label={i18nt('Settings')}
      description={i18nt('Configure your workspace')}/>

      <HDXMenuAction
      on:click={ () => {
        showPopup(HelpAndSupport, {}, 'help-center')
      } }
      icon={support.icon.Support}
      label={i18nt('Support')}
      description={i18nt('Contact your admin')}/>
    {/if}

    <div class="HDXWorkspaceSelectorHeader">Switch workspace to...</div>
    {#if $workspacesStore.length}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  {#if isAdmin}
    <div class="p-2 ml-2 mr-2 mb-2 flex-grow flex-row-center">
      <SearchEdit bind:value={search} width={'100%'} />
      {#if isAdminUser()}
        <div class="p-1">
          {#if $workspacesStore.length > 500}
            500 /
          {/if}
          {$workspacesStore.length}
        </div>
      {/if}
    </div>
    <div class="p-2 ml-2 mb-4 select-text flex-col bordered">
      {decodeTokenPayload(getMetadata(presentation.metadata.Token) ?? '').workspace ?? ''}
    </div>
  {/if}
  {#each $workspacesStore
    .filter((it) => search === '' || (it.name?.includes(search) ?? false) || it.url.includes(search))
    .slice(0, 500) as ws, i}
    {@const wsName = ws.name ?? ws.url}
    {@const _activeSession = activeSessions[ws.uuid]}
    {@const lastUsageDays = Math.round((Date.now() - (ws.lastVisit ?? 0)) / (1000 * 3600 * 24))}
    <HDXWorkspaceSelectorItem
    name={ws.url}
    description={'Days:' + lastUsageDays}
    selected={$resolvedLocationStore.path[1] === ws.url}
    onSelect={(event) => {
      clickHandler(event, ws.url)
    }}
    />
  {/each}
  <div class="ap-space x2" />
{:else}
  <div class="antiPopup"><Loading /></div>
{/if}
</HDXScrollable>
<HDXMenuAction
on:click={ () => { inviteWorkspace() } }
icon={setting.icon.Signout}
label={i18nt('Forget this device')}
description={i18nt('Clean-up local data and sign-out')}/>
</div>

<style lang="scss">
  .HDXWorkspaceSelector {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .HDXWorkspaceSelectorHeader {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 1.5rem;
    height: 4.5rem;
    font-size: 0.99rem;
    font-weight: 100;
    text-transform: uppercase;
    color: var(--theme-navpanel-text);
    opacity: 0.8;
  }

  .HDRWorkspaceSelectorButton {
    outline: none;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* justify-content: space-between; */
    width: 100%;
    padding: 0.5rem 0.7rem;
    /* margin-left: 2rem; */
    margin-top: 0.5rem;
    /* border-left: solid 0.5px rgba(0, 0, 0, 0.2); */
    height: 3rem;
    border-radius: 0px;
    background-color: transparent;
    color: var(--theme-navpanel-text);
    text-decoration: none;
    font-size: 0.9rem;
    border-left: solid 0.5px rgba(0, 0, 0, 0.5);
    margin-left: 4.5rem;

    &:hover {
      background-color: rgba(180, 191, 193, 0.5);
      color: var(--theme-inbox-people-counter-text);
      border-left: solid 0.5px transparent;
      font-weight: 400;
    }

    &.active {
      background-color: rgba(131, 176, 184, 0.5);
      color: var(--theme-inbox-people-counter-text);
      font-weight: 400;
    }
  }

  .active {
    background-color: var(--theme-inbox-people-counter-bgcolor);
  }
</style>
