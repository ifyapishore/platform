<!-- WorkspaceSwitch.svelte -->
<script lang="ts">
  // import { Writable } from 'svelte/store'

  // export let size: 'small' | 'medium' | 'large'
  // export let fill: string = 'currentColor'
  export let addIcon: boolean

  </script>

  <div class="HDXAppVisibility">
    {#if addIcon}
    <svg viewBox="0 0 24 24"
        width="16" height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
    {:else}
      <svg viewBox="0 0 24 24"
            width="16" height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    {/if}
  </div>

  <style>
  .HDXAppVisibility {
    position: relative;
    width: 2rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* cursor: pointer; */
    pointer-events: none;
    color: var(--theme-navpanel-icons-color);

    & > svg {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
</style>
