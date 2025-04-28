<!-- WorkspaceSwitch.svelte -->
<script lang="ts">
  export let size: 'small' | 'medium' | 'large'
  // export let fill: string = 'currentColor'
  export let expanded: boolean

  </script>

  <div class="HDXWorkspaceSwitch" class:expanded={expanded}>
    <svg width="24" height="24" viewBox="0 0 24 24" class="svg-{size}" fill="none"
        stroke="currentColor" stroke-width="1" stroke-linecap="round"
        stroke-linejoin="round">
    <!--    <path d="M12 5v8" />-->
    <path d="M12 5l-3 3" />
    <path d="M12 5l3 3" />
    <path d="M12 14v-4" />
    <path d="M12 19l-3-3" />
    <path d="M12 19l3-3" />
    </svg>
  </div>

  <style>
  .HDXWorkspaceSwitch {
    position: relative;
    width: 2rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.expanded {
      transform: rotate(180deg);
    }

    & > svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
</style>
