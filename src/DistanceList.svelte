<script>
  import { distanceStatsCache } from "./stores";
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import DistanceListItem from "./DistanceListItem.svelte";

  let dummyArray = [
    { id: "SWA", distance: 82739.707875192762 },
    { id: "AAL", distance: 75246.193329843256 },
    { id: "DAL", distance: 45041.926220355119 },
    { id: "UAL", distance: 29202.606273851223 },
    { id: "JBU", distance: 18581.967440776476 },
  ];
</script>

<div class="flex items-center p-3 border-b rounded-t-md bg-gray-50">
  <div class="tracking-wider text-gray-500 uppercase w-36">Name</div>
  <div class="ml-4 tracking-wider text-gray-500 uppercase w-28">Identifier</div>
  <div class="ml-4 tracking-wider text-gray-500 uppercase">Distance (km)</div>
</div>
<VirtualList
  items={$distanceStatsCache.sort((a, b) => {
    a.distance - b.distance;
  })}
  let:item>
  <DistanceListItem {...item} />
</VirtualList>
