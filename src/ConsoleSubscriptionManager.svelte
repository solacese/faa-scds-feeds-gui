<script>
  import { getContext } from "svelte";
  import { distanceStatsCache } from "./stores";
  import { solaceContextKey } from "./solace-client";
  import { parseDistanceBatchEvent } from "./feed-kdb-distance-stats";

  const { getSolaceClient } = getContext(solaceContextKey);
  let solaceClient = getSolaceClient();

  let activeSubscriptions = {};

  const distanceBatchEventHandler = (message) => handleDistanceBatch(parseDistanceBatchEvent(message));

  $: {
    if ($solaceClient) {
      try {
        if (!activeSubscriptions["SOLACE/KDB/FLIGHTS/DISTANCE"]) {
          $solaceClient.subscribe("SOLACE/KDB/FLIGHTS/DISTANCE", distanceBatchEventHandler);
          activeSubscriptions["SOLACE/KDB/FLIGHTS/DISTANCE"] = true;
        }
        console.log("ConsoleSubscriptionManager: subscriptions updated to...");
        console.dir(Object.keys(activeSubscriptions));
      } catch {
        console.error("ConsoleSubscriptionManager - error adding subscriptions");
      }
    }
  }

  // wipe subscriptions on client disconnect
  $: {
    if (!$solaceClient) {
      activeSubscriptions = {};
    }
  }

  function handleDistanceBatch(distanceBatch) {
    $distanceStatsCache = [...distanceBatch];
  }
</script>
