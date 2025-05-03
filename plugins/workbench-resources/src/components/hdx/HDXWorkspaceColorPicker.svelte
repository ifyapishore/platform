<script lang="ts">
    export let workspaceColor: number = 1
    export let onChange: (colorNumber: number) => void

    const COLORS = [1, 2, 3, 4, 5, 6, 7]

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
          style="background-color: var(--hdx-workspace-icon-color-{color});"
        />
      </button>
    {/each}
  </div>

  <style>
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
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .color-box {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 0.1rem;
    }

    .selected {
      border-color: black;
    }
</style>
