<!--
This component provides a navigation panel for the workbench application.

There modes:
- Collapsed: Shows only the logo and icons of the pinned modules.
- Expanded: Shows the logo, active workbench name, and more section. Close on mouse out or tach outside.
- Edit: Shows the logo, and edit capabilities. Close on "Done" button click. Mouse out or touch outside does not close the panel, but show warning?
Main features:
- Expand on hover. On touch devices, it expands on tap or global wipe to the right
- LINE 1: Displays the logo + active workbench name in expanded state. Allow to change the workbench from here.
- LINE 2: Pinned modules. Inbox is always first and pinned.
- Scrollable area:
  - List of pinned modules are always visible
    - Collapsed state: icon + selection effect to show current one
    - Expanded state: icon + name
    - Edit state: Reorder shevron + icon + name + remove button
  - More section: visible only in the expanded/edit state!
    - Header: "More" + motto text
    - List of unpinned modules
      - Collapsed state: icon + selection effect to show current one
      - Expanded state: icon + name
      - Edit state: Reorder shevron + icon + name + remove button"

TODO:
  - Profile, settings, and help buttons must be moved to the top bar (user account area)
  - Expanded and edit state must be processed in the global mode (video components can be sensitive to this)
-->
<script lang="ts">
  import { onMount } from 'svelte'
  import notification, { DocNotifyContext, InboxNotification, notificationId } from '@hcengineering/notification'
  import { BrowserNotificatator, InboxNotificationsClientImpl } from '@hcengineering/notification-resources'
  import { broadcastEvent, getMetadata, getResource, IntlString, translate } from '@hcengineering/platform'
  import { get } from 'svelte/store'
  import { WithLookup } from '@hcengineering/core'
  import {
    accessDeniedStore,
    ActionHandler,
    ListSelectionProvider,
    migrateViewOpttions,
    NavLink,
    parseLinkId,
    updateFocus
  } from '@hcengineering/view-resources'
  import type {
    Application,
    NavigatorModel,
    SpecialNavModel,
    ViewConfiguration,
    WorkbenchTab
  } from '@hcengineering/workbench'
  import contact, { getCurrentEmployee } from '@hcengineering/contact'
  import {
    AnyComponent,
    areLocationsEqual,
    Button,
    closePanel,
    closePopup,
    closeTooltip,
    CompAndProps,
    Component,
    defineSeparators,
    deviceOptionsStore as deviceInfo,
    Dock,
    getCurrentLocation,
    getLocation,
    IconSettings,
    Label,
    languageStore,
    Location,
    location,
    locationStorageKeyId,
    locationToUrl,
    mainSeparators,
    navigate,
    showPanel,
    PanelInstance,
    Popup,
    PopupAlignment,
    PopupPosAlignment,
    PopupResult,
    popupstore,
    pushRootBarComponent,
    ResolvedLocation,
    resolvedLocationStore,
    Separator,
    setResolvedLocation,
    showPopup,
    TooltipInstance,
    workbenchSeparators,
    resizeObserver,
    isSameSegments
  } from '@hcengineering/ui'
  import setting from '@hcengineering/setting'
  import support, { supportLink, SupportStatus } from '@hcengineering/support'
  import workbench from '../../plugin'
  import AccountPopup from '../AccountPopup.svelte'
  import AppSwitcher from '../AppSwitcher.svelte'
  import TopMenu from '../icons/TopMenu.svelte'

  import HDXWorkbenchNavigatorHeader from './HDXWorkbenchNavigatorHeader.svelte'
  import HDXAppItemHero from './HDXAppItemHero.svelte'
  import HDXWorkbenchNavigatorFooter from './HDXWorkbenchNavigatorFooter.svelte'
  import HDXWorkbenchNavigatorFooterItem from './HDXWorkbenchNavigatorFooterItem.svelte'
  import HDXApplications from './HDXApplications.svelte'
  import HDXAppItem from './HDXAppItem.svelte'
  import AppItem from '../AppItem.svelte'
  import { Person } from '@hcengineering/contact'
  import { workbenchUiModel } from './HDXWorkspaceModel'
  import HDXWorkspaceSelector from './HDXWorkspaceSelector.svelte'
  // used to prevent the navigator if user hover it durig firstTimeDelay

  // Props
  export let windowWorkspaceName: string
  export let currentAppAlias: string | undefined
  export let apps: Application[]
  export let appsMini: boolean
  export let toggleNav: () => void
  export let hasInboxNotifications: boolean
  export let currentApplication: Application | undefined
  export let popupPosition: PopupPosAlignment
  export let supportStatus: SupportStatus | undefined
  export let supportWidgetLoading: boolean
  export let person: WithLookup<Person> | undefined

  let lastLoc: Location | undefined = undefined

  onMount(() => {
    workbenchUiModel.onMount()
  })

  // Rendering shortcuts
  $: expanded = workbenchUiModel.isExpanded
  $: expandedWide = workbenchUiModel.isExpandedWide
  $: workspaceColor = workbenchUiModel.workspaceColor
  $: isWorkspaceMode = workbenchUiModel.isWorkspaceMode

</script>

<div
  class="HDXWorkbenchNavigator panel-theme-{$workspaceColor} no-print"
  class:expanded={$expanded}
  role="presentation"
  on:mouseenter={workbenchUiModel.onHover} on:mouseleave={workbenchUiModel.onBlur}>
  <div
    class="HDXWorkbenchNavigator-Inner panel-theme-{$workspaceColor}"
    class:expanded={$expanded}
    class:expandedWide={$expandedWide}
    >

    <HDXWorkbenchNavigatorHeader windowWorkspaceName={windowWorkspaceName} {workbenchUiModel}/>

    {#if $isWorkspaceMode}
      <HDXWorkspaceSelector {workbenchUiModel}/>
    {:else}
        <NavLink
          app={notificationId}
          shrink={0}
          disabled={!$deviceInfo.navigator.visible && $deviceInfo.navigator.float && currentAppAlias === notificationId}
        >
          <HDXAppItemHero
            {workbenchUiModel}
            label={notification.string.Inbox}
            selected={currentAppAlias === notificationId}
            on:click={(e) => {
              // WHY?
              if (e.metaKey || e.ctrlKey) return
              // WHY: It is mixed logic from VSCode.
              // Unexpected behavior without visual notification for most of non tech users
              if (!$deviceInfo.navigator.visible && $deviceInfo.navigator.float && currentAppAlias === notificationId) {
                toggleNav()
              } else if (currentAppAlias === notificationId && lastLoc !== undefined) {
                e.preventDefault()
                e.stopPropagation()
                navigate(lastLoc)
                lastLoc = undefined
              } else {
                lastLoc = $location
              }
            }}
            notify={hasInboxNotifications}
          />
        </NavLink>
        <HDXApplications
          {apps}
          {workbenchUiModel}
          active={currentApplication?._id}
          direction={$deviceInfo.navigator.direction}
          on:toggleNav={toggleNav}
        />
        <HDXAppItem
          icon={TopMenu}
          expanded={false}
          label={$deviceInfo.navigator.visible ? workbench.string.HideMenu : workbench.string.ShowMenu}
          selected={!$deviceInfo.navigator.visible}
          appsMini={appsMini}
          on:click={toggleNav}
        />
        {#if get(workbenchUiModel.showBottomActions)}
        <HDXWorkbenchNavigatorFooter {workbenchUiModel}>
          <HDXWorkbenchNavigatorFooterItem mode="action" {workbenchUiModel}>
            <AppItem
              icon={IconSettings}
              label={setting.string.Settings}
              on:click={() => showPopup(AppSwitcher, { apps }, popupPosition)}
            />
          </HDXWorkbenchNavigatorFooterItem>
          <HDXWorkbenchNavigatorFooterItem mode="action" {workbenchUiModel}>
            <a href={supportLink} target="_blank" rel="noopener noreferrer">
              <AppItem
                icon={support.icon.Support}
                label={support.string.ContactUs}
                notify={supportStatus?.hasUnreadMessages}
                selected={supportStatus?.visible}
                loading={supportWidgetLoading}
              />
            </a>
        </HDXWorkbenchNavigatorFooterItem>
      <!-- {#await supportClient then client}
          {#if client}
            <AppItem
              icon={support.icon.Support}
              label={support.string.ContactUs}
              size={appsMini ? 'small' : 'large'}
              notify={supportStatus?.hasUnreadMessages}
              selected={supportStatus?.visible}
              loading={supportWidgetLoading}
              on:click={async () => {
                await handleToggleSupportWidget()
              }}
            />
          {/if}
        {/await} -->
        <HDXWorkbenchNavigatorFooterItem mode="action" {workbenchUiModel}>
          <div
            id="profile-button"
            class="cursor-pointer"
            role="presentation"
            on:click|stopPropagation={() => showPopup(AccountPopup, {}, popupPosition)}
          >
            <Component
              is={contact.component.Avatar}
              props={{ person, name: person?.name, size: 'small', showStatus: true }}
            />
          </div>
        </HDXWorkbenchNavigatorFooterItem>
      </HDXWorkbenchNavigatorFooter>
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  .HDXWorkbenchNavigator {
    position: relative;
    flex-shrink: 0;

    min-width: var(--app-panel-width);
    width: var(--app-panel-width);
    max-width: var(--app-panel-width);

    background-color: var(--theme-navpanel-color);
    border-right: 1px solid var(--theme-navpanel-divider);
    // z-index: 10000;
    z-index: 9999; // below popup

    //TODO: tmp fix for the main layout
    height: 100vh;
    margin-top: calc(var(--theme-hdx-app-title-height) * -1);
  }

  .HDXWorkbenchNavigator-Inner {
      position: relative;
      display: flex;
      justify-content: space-between;
      /* align-items: center; */
      flex-direction: column;
      min-width: var(--app-panel-width);
      max-width: var(--app-panel-width);
      width: var(--app-panel-width);
      height: 100%;
      border: none;
      /* background-color: blue; */

      &.expanded {
        min-width: calc(var(--app-panel-width) * 3);
        max-width: calc(var(--app-panel-width) * 3);
        width: calc(var(--app-panel-width) * 3);
        z-index: 1;
        backdrop-filter: blur(30px);

        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-top-right-radius: var(--medium-BorderRadius);
        border-bottom-right-radius: var(--medium-BorderRadius);

        &.expandedWide {
          min-width: calc(var(--app-panel-width) * 5);
          max-width: calc(var(--app-panel-width) * 5);
          width: calc(var(--app-panel-width) * 5);
          backdrop-filter: blur(30px);
          box-shadow: 0 0 20px rgba(0,0,0,0.15);
        }

        &.panel-theme-1 {
          background-color: var(--hdx-workspace-panel-bg-color-1);
        }
        &.panel-theme-2 {
          background-color: var(--hdx-workspace-panel-bg-color-2);
        }
        &.panel-theme-3 {
          background-color: var(--hdx-workspace-panel-bg-color-3);
        }
        &.panel-theme-4 {
          background-color: var(--hdx-workspace-panel-bg-color-4);
        }
        &.panel-theme-5 {
          background-color: var(--hdx-workspace-panel-bg-color-5);
        }
      }
    }
</style>
