<script>
  import { fade } from "svelte/transition";
  import { mapCurrentSelection } from "./stores";
  import SubscriptionList from "./SubscriptionList.svelte";
  import SvgRectangle from "./SvgRectangle.svelte";

  // virtual list needs some help with height in px
  let listHeight;
</script>

<div transition:fade={{ duration: 200 }} class="w-full h-full">
  {#if $mapCurrentSelection}
    {#if $mapCurrentSelection.type == 'rectangle'}
      <div class="grid w-full h-full grid-rows-2 gap-8 lg:grid-cols-2 lg:grid-rows-1">
        <!-- rectangle filter visualizer -->
        <div>
          <h2 class="text-lg text-gray-800">Rectangle filter</h2>
          <div class="flex flex-col items-center justify-center w-full h-full">
            <div class="flex justify-between w-full lg:w-3/4">
              <div class="text-sm text-gray-700">
                ({$mapCurrentSelection.getBounds().getNorthEast().lat().toFixed(5)}, {$mapCurrentSelection
                  .getBounds()
                  .getSouthWest()
                  .lng()
                  .toFixed(5)})
              </div>
              <div class="text-sm text-gray-700">
                ({$mapCurrentSelection.getBounds().getNorthEast().lat().toFixed(5)}, {$mapCurrentSelection
                  .getBounds()
                  .getNorthEast()
                  .lng()
                  .toFixed(5)})
              </div>
            </div>
            <div class="h-3/5">
              <SvgRectangle />
            </div>
            <div class="flex justify-between w-full lg:w-3/4">
              <div class="text-sm text-gray-700">
                ({$mapCurrentSelection.getBounds().getSouthWest().lat().toFixed(5)}, {$mapCurrentSelection
                  .getBounds()
                  .getSouthWest()
                  .lng()
                  .toFixed(5)})
              </div>
              <div class="text-sm text-gray-700">
                ({$mapCurrentSelection.getBounds().getSouthWest().lat().toFixed(5)}, {$mapCurrentSelection
                  .getBounds()
                  .getNorthEast()
                  .lng()
                  .toFixed(5)})
              </div>
            </div>
          </div>
        </div>
        <!-- topic subscription list -->
        <div bind:clientHeight={listHeight}>
          <h2 class="mb-4 text-lg text-gray-800">Associated topic subscriptions</h2>
          <div style="height: calc({listHeight}px - 3rem)">
            <SubscriptionList rectangle={$mapCurrentSelection} />
          </div>
        </div>
      </div>
    {/if}
    {#if $mapCurrentSelection.type == 'marker'}
      <div>{$mapCurrentSelection.type}</div>
    {/if}
  {:else}
    <div class="flex items-center justify-center h-full">
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
      <div class="ml-2 text-xl text-gray-500 lg:text-3xl">Click an object on the map to learn more about it</div>
    </div>
  {/if}
</div>
