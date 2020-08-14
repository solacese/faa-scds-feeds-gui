<script>
  import { onMount } from "svelte";
  import { throttle } from "./throttle";
  import { markers, markerCluster, mapUpdateBatch } from "./stores";
  import MarkerClusterer from "@google/markerclustererplus";
  import MapDrawingManager from "./MapDrawingManager.svelte";
  import MapSubscriptionManager from "./MapSubscriptionManager.svelte";

  let map;
  let container;
  let zoom = 4;
  let center = { lat: 40, lng: -110 };
  let updateIntervalMs = 500;

  onMount(async () => {
    map = new google.maps.Map(container, {
      zoom,
      center,
    });
    $markerCluster = new MarkerClusterer(map, [], {
      imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      maxZoom: 6, // set to 1 to effectively disable clustering
      minimumClusterSize: 25,
      styles: [
        {
          width: 30,
          height: 30,
          className: "custom-clustericon-1",
        },
        {
          width: 40,
          height: 40,
          className: "custom-clustericon-2",
        },
        {
          width: 50,
          height: 50,
          className: "custom-clustericon-3",
        },
      ],
      clusterClass: "custom-clustericon",
    });
  });

  const updateMap = throttle(
    () => {
      if (map) {
        // remove markers that need to be updated
        if (Object.keys($mapUpdateBatch.remove).length > 0) {
          $markerCluster.removeMarkers(
            // removeMarkers() accepts an array of markers to remove,
            // but careful it is deceiving — passing in the references to the markers you add won't help,
            // because the MarkerClusterer keeps its own set of references to the markers it adds.
            // This means to remove markers, you need to filter the array of references returned by .getMarkers().
            // @googlemaps, I learned this through brute force troubleshooting & some obscure blog post, not docs :(
            $markerCluster.getMarkers().filter((marker) => {
              return $mapUpdateBatch.remove[marker.title];
            })
          );
        }
        // add markers that are marked for adding
        $markerCluster.addMarkers(Object.values($mapUpdateBatch.add));
        // update markers lookup table
        $markers = { ...$markers, ...$mapUpdateBatch.add };
        // clear mapUpdateBatch object
        $mapUpdateBatch = { add: {}, remove: {} };
      }
    },
    updateIntervalMs,
    true
  );

  $: if ($mapUpdateBatch) {
    updateMap();
  }
</script>

<div class="flex flex-col w-full h-full">
  <div class="flex-shrink-0 h-8 p-1 my-auto">
    {#if map}
      <MapDrawingManager {map} />
    {/if}
  </div>
  <div bind:this={container} class="w-full h-full" />
</div>

<MapSubscriptionManager />
