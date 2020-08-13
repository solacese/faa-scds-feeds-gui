<script>
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import SubscriptionListItem from "./SubscriptionListItem.svelte";
  import { createFdpsSubscriptionList } from "./geo-filtering";

  export let rectangle;
  // a robust solution would store the topic subscriptions along with the rectangle map,
  // but a hacky way to get this topic list is to just recalculate the values for the provided rectangle
  let _rectangleMap;
  $: {
    _rectangleMap = new Map();
    _rectangleMap.set(rectangle, rectangle);
  }
  let topicSubscriptions;
  $: if (rectangle) {
    topicSubscriptions = createFdpsSubscriptionList(_rectangleMap);
  }
</script>

<VirtualList
  items={Object.keys(topicSubscriptions).map((topic, i) => {
    return { topic };
  })}
  let:item>
  <SubscriptionListItem {item} />
</VirtualList>
