<!-- WorkspaceSwitch.svelte -->
<script lang="ts">
  import { Writable } from 'svelte/store'

  export let size: 'small' | 'medium' | 'large'
  // export let fill: string = 'currentColor'
  export let expandedWorkspaces: boolean

  </script>

  <div class="HDXWorkspaceSwitch" class:expanded={expandedWorkspaces}>
    {#if expandedWorkspaces}
    <svg width="24" height="24" viewBox="0 0 24 24" class="svg-{size}" fill="none"
        stroke="currentColor" stroke-width="1" stroke-linecap="round"
        stroke-linejoin="round">
        <!--    <path d="M12 5v8" />-->
        <path d="M12 10l-3 -3" />
        <path d="M12 10l3 -3" />
        <path d="M3 12.5h18" stroke-width="0.5"/>
        <path d="M12 15l-3 3"/>
        <path d="M12 15l3 3" />
        <!-- <path d="M12 11.5l-3 -3" />
        <path d="M12 11.5l3 -3" />
        <path d="M12 12.5l-3 3"/>
        <path d="M12 12.5l3 3" /> -->
      </svg>
    {:else}
      <svg width="24" height="24" viewBox="0 0 24 24" class="svg-{size}" fill="none"
          stroke="currentColor" stroke-width="1" stroke-linecap="round"
          stroke-linejoin="round">
      <!--    <path d="M12 5v8" />-->
      <path d="M12 18l-3 -3" />
      <path d="M12 18l3 -3" />
      <path d="M3 12.5h18" stroke-width="0.5"/>
      <path d="M12 6l-3 3"/>
      <path d="M12 6l3 3" />
    </svg>
    {/if}
  </div>

  <style>
  .HDXWorkspaceSwitch {
    position: relative;
    width: 2rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* cursor: pointer; */
    pointer-events: none;

    &.expanded {
      transform: rotate(180deg);
    }

    & > svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
</style>
