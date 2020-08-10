<script>
  import { mapCurrentSelection } from "./stores";

  $: if ($mapCurrentSelection) {
    console.log($mapCurrentSelection.type);
  }
</script>

<div class="flex items-center justify-center h-full">
  {#if $mapCurrentSelection}
    <div>wow much selected</div>
  {:else}
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <svg
          class="w-20 h-20 text-gray-400"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122
            2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      </div>

      <div class="ml-2 text-3xl text-gray-500">Click an object on the map to learn more about it</div>
    </div>
  {/if}
</div>
