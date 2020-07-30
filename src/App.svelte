<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { googleMapsConfig } from "./google-maps.config";
  import { solaceContextKey } from "./solace-client";
  import ConnectionForm from "./ConnectionForm.svelte";
  import FeedToggles from "./FeedToggles.svelte";
  import Map from "./Map.svelte";

  export let googleMapsLoaded;

  const googleMapsAccessToken = googleMapsConfig.accessToken;

  let solaceClient = writable(null);
  setContext(solaceContextKey, {
    getSolaceClient: () => solaceClient,
  });
</script>

<style>
  .layout {
    grid-template-columns: 28rem auto;
    grid-template-areas: "sidebar mainContent";
  }
  .sidebar {
    grid-area: sidebar;
  }
  .mainContent {
    grid-area: mainContent;
  }
</style>

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

<main class="p-2 overflow-x-hidden max-w-screen lg:h-screen lg:grid lg:gap-4 lg:p-4 layout">
  <div class="flex flex-col sidebar">
    <div>
      <ConnectionForm />
    </div>
    <div class="mt-4">
      <FeedToggles />
    </div>
  </div>
  <div class="flex flex-col mainContent">
    {#if googleMapsLoaded}
      <div class="p-2 mt-4 bg-white rounded-lg shadow lg:h-full lg:mt-0" style="height: 36rem;">
        <Map />
      </div>
    {:else}
      <div class="w-full bg-blue-300 rounded-lg shadow" />
    {/if}
  </div>
</main>
