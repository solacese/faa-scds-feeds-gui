<script>
  import { getContext } from "svelte";
  import { fdpsFeedCache, activeFeeds, filters, markers, mapUpdateBatch } from "./stores";
  import { solaceContextKey } from "./solace-client";
  import { parseFdpsPositionTick, getRotatedIconUrl } from "./feed-fdps";
  import { containedByOneOrMoreRectangleBounds, createFdpsSubscriptionList } from "./geo-filtering";

  const { getSolaceClient } = getContext(solaceContextKey);
  let solaceClient = getSolaceClient();

  let activeSubscriptions = {};

  $: {
    if ($solaceClient) {
      try {
        if ($activeFeeds["fdps"]) {
          // generate the list of subscriptions that correspond to a map of rectangle filters," "
          // this statement executes any time the filters map is updated
          const updatedSubscriptionList = createFdpsSubscriptionList($filters);
          // diff updatedSubscriptionList and activeSubscriptions to see what subscriptions need to be applied
          let subscribeList = [];
          for (const topic of Object.keys(updatedSubscriptionList)) {
            if (!activeSubscriptions[topic]) {
              subscribeList.push(topic);
            }
          }
          // diff activeSubscriptions and updatedSubscriptionList to see what to unsubscribe from
          let unsubscribeList = [];
          for (const topic of Object.keys(activeSubscriptions)) {
            if (!updatedSubscriptionList[topic]) {
              unsubscribeList.push(topic);
            }
          }
          // apply changes to session
          for (const topic of subscribeList) {
            subscribeFdpsPositionTopic(topic);
            activeSubscriptions[topic] = true;
          }
          for (const topic of unsubscribeList) {
            $solaceClient.unsubscribe(topic);
            delete activeSubscriptions[topic];
          }

          console.log("MapSubscriptionManager: subscriptions updated to...");
          console.dir(Object.keys(activeSubscriptions));
        }
      } catch {
        console.error("MapSubscriptionManager - error adding subscriptions");
      }
    }
  }

  // wipe subscriptions on client disconnect
  $: {
    if (!$solaceClient) {
      activeSubscriptions = {};
    }
  }

  function subscribeFdpsPositionTopic(topic) {
    $solaceClient.subscribe(topic, (msg) => {
      // parse tick and create a LatLng Google Maps object to help w/ map geometry logic
      const fdpsPositionTick = parseFdpsPositionTick(msg);
      const fdpsPositionTickLatLng = new google.maps.LatLng(Number(fdpsPositionTick.lat), Number(fdpsPositionTick.lon));

      // cache position tick
      $fdpsFeedCache[fdpsPositionTick.aircraftIdentifier] = fdpsPositionTick;

      // if the position tick is not contained by the bounds of a rectangle filter,
      if (!containedByOneOrMoreRectangleBounds(fdpsPositionTickLatLng, $filters)) {
        // and there's an old marker for this aircraft on the map
        if ($markers[fdpsPositionTick.aircraftIdentifier]) {
          // mark the old marker to be removed from the map
          $mapUpdateBatch = {
            ...$mapUpdateBatch,
            remove: {
              ...$mapUpdateBatch.remove,
              [fdpsPositionTick.aircraftIdentifier]: true,
            },
          };
        }
        // return early
        return;
      }

      // if the fdps position tick is in the bounds of a rectangle filter,
      // create a marker for the aircraft using the position data from the tick
      let marker = new google.maps.Marker({
        position: fdpsPositionTickLatLng,
        title: fdpsPositionTick.aircraftIdentifier,
        icon: getRotatedIconUrl(fdpsPositionTick),
      });

      // if a marker already exists for the aircraft,
      if ($markers[fdpsPositionTick.aircraftIdentifier]) {
        //mark the old marker to be removed
        $mapUpdateBatch = {
          ...$mapUpdateBatch,
          remove: {
            ...$mapUpdateBatch.remove,
            [fdpsPositionTick.aircraftIdentifier]: true,
          },
        };
        //mark the new marker to be added
        $mapUpdateBatch = {
          ...$mapUpdateBatch,
          add: {
            ...$mapUpdateBatch.add,
            [fdpsPositionTick.aircraftIdentifier]: marker,
          },
        };
        return;
      }

      // if no marker already existed for the aircraft,
      // mark the new marker to be added
      $mapUpdateBatch = {
        ...$mapUpdateBatch,
        add: { ...$mapUpdateBatch.add, [fdpsPositionTick.aircraftIdentifier]: marker },
      };
    });
  }
</script>
