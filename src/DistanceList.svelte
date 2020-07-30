<script>
  import { distanceStatsCache } from "./stores";
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import DistanceListItem from "./DistanceListItem.svelte";
</script>

<VirtualList items={$distanceStatsCache} let:item>
  <DistanceListItem {...item} />
</VirtualList>
