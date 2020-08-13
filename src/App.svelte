<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { googleMapsConfig } from "./google-maps.config";
  import { solaceContextKey } from "./solace-client";
  import Toolbar from "./Toolbar.svelte";
  import Map from "./Map.svelte";
  import Console from "./Console.svelte";

  export let googleMapsLoaded;

  const googleMapsAccessToken = googleMapsConfig.accessToken;

  let solaceClient = writable(null);
  setContext(solaceContextKey, {
    getSolaceClient: () => solaceClient,
  });
</script>

<svelte:head>
  <script
    defer
    async
    src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsAccessToken}&libraries=drawing&callback=initMap`}>
    // Google Maps isn't available as a Node package because... Google eats glue? I have no idea.
    // This script loads the Google Maps package and then calls the initMap callback defined in main.js,
    // which will set this component's googleMapsLoaded state flag to true on completion.
  </script>
</svelte:head>

<main class="flex flex-col min-h-screen p-4 lg:flex-row">
  <div class="lg:min-h-full">
    <Toolbar />
  </div>
  <!-- spacer-4 -->
  <div class="w-4 h-4" />
  <!-- /spacer -->
  <div class="flex flex-col flex-grow">
    {#if googleMapsLoaded}
      <div class="p-2 mt-4 bg-white rounded-lg shadow h-1/2-screen lg:h-full lg:mt-0">
        <Map />
      </div>
    {:else}
      <div class="w-full h-screen p-2 mt-4 bg-blue-300 rounded-lg shadow lg:h-full lg:mt-0" />
    {/if}
    <!-- spacer-4 -->
    <div class="w-4 h-4" />
    <!-- /spacer -->
    <div>
      <Console />
    </div>
  </div>
</main>
