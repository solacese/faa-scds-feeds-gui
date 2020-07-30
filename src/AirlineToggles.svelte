<script>
  import { activeAirlines } from "./stores";

  function toggle(airlineIdentifier) {
    $activeAirlines[airlineIdentifier] = !$activeAirlines[airlineIdentifier];
  }
</script>

<div class="w-full px-4 py-5 mt-2 overflow-hidden bg-white rounded-lg shadow sm:p-6">
  <h2 class="text-xl text-gray-900 sm:text-2xl">Subscribe to SWIM feeds</h2>
  <div class="flex flex-wrap max-w-full mt-2">
    <button
      on:click={() => toggle('NASDAQ')}
      role="checkbox"
      aria-checked="false"
      class={`inline-flex items-center p-2 mr-2 border-2 rounded-md shadow-sm cursor-pointer focus:outline-none focus:shadow-outline ${$activeAirlines['NASDAQ'] ? 'bg-blue-100 border-blue-500' : ''}`}>
      <div class="flex-shrink-0 h-10 mr-2" />
      <div class={$activeAirlines['NASDAQ'] ? 'text-blue-700' : 'text-gray-700'}>NASDAQ</div>
    </button>
  </div>
</div>
