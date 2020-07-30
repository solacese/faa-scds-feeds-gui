<script>
  import { activeFeeds } from "./stores";
  import SvgAirplane from "./SvgAirplane.svelte";

  function toggle(feedName) {
    $activeFeeds[feedName] = !$activeFeeds[feedName];
  }
</script>

<div class="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
  <h2 class="text-xl text-gray-900 sm:text-2xl">Subscribe to SCDS feeds</h2>
  <div class="flex flex-wrap max-w-full mt-2">
    <button
      on:click={() => toggle('fdps')}
      role="checkbox"
      aria-checked="false"
      class={`h-24 w-36 flex flex-col justify-center items-center p-2 mr-2 border-2 rounded-md shadow-sm cursor-pointer focus:outline-none focus:shadow-outline ${$activeFeeds['fdps'] ? 'bg-blue-100 border-blue-500' : ''}`}>
      <div class="flex-shrink-0 h-10">
        <SvgAirplane />
      </div>
      <div class={`${$activeFeeds['fdps'] ? 'text-blue-700' : 'text-gray-700'}} mt-1`}>FDPS</div>
    </button>
  </div>
</div>
