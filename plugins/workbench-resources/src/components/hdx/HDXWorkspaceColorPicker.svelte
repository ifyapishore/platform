<script lang="ts">
    export let workspaceColor: number = 1
    export let onChange: (colorNumber: number) => void

    const COLORS = [1, 2, 3, 4, 5]

    function handleClick (e: MouseEvent, color: number): void {
      e.stopPropagation()
      onChange(color)
    }
</script>

  <div class="picker">
    {#each COLORS as color}
      <button
        class="item"
        class:selected={workspaceColor === color}
        on:click={(e) => { handleClick(e, color) }}>
        <div
          class="color-box"
          style="background-color: var(--hdx-workspace-panel-icon-color-{color});"
        />
      </button>
    {/each}
  </div>

  <style lang="scss">
    .picker {
      display: flex;
      align-items: center;
      gap: 0.5rem; /* Equal spacing */
      height: 2rem;
      margin-left: var(--app-panel-width);
    }

    .item {
      width: 1rem;
      height: 1rem;
      border: 0.5px solid rgba(128, 128, 128, 0.3);
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        border-color: rgba(128, 128, 128, 0.75);
      }

      &.selected {
        border-color: rgba(128, 128, 128, 0.95);
      }
    }

    .color-box {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 0.1rem;
    }

</style>
