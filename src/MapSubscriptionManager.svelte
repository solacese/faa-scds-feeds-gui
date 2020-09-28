<script>
  import { getContext } from "svelte";
  import { fdpsFeedCache, filters, markers, mapCurrentSelection, mapUpdateBatch } from "./stores";
  import { solaceContextKey } from "./solace-client";
  import { parseFdpsPositionTick, getRotationAngle } from "./feed-fdps";
  import { containedByOneOrMoreRectangleBounds, createFdpsSubscriptionList } from "./geo-filtering";

  const { getSolaceClient } = getContext(solaceContextKey);
  let solaceClient = getSolaceClient();

  let activeSubscriptions = {};

  $: {
    if ($solaceClient) {
      try {
        // generate the list of subscriptions that correspond to a map of rectangle filters,
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
        //}
      } catch {
        console.error("MapSubscriptionManager - error adding subscriptions");
      }
    }
  }

  // wipe subscription manager subscriptions if client disconnects
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
      });
      marker.type = "marker";
      // if this is an update to an existing marker, calculate heading using prev lat,lng
      if ($fdpsFeedCache[fdpsPositionTick.aircraftIdentifier]) {
        // form
        let prevLatLng = new google.maps.LatLng(
          Number($fdpsFeedCache[fdpsPositionTick.aircraftIdentifier].lat),
          Number($fdpsFeedCache[fdpsPositionTick.aircraftIdentifier].lon)
        );
        // calc heading
        let heading = google.maps.geometry.spherical.computeHeading(prevLatLng, fdpsPositionTickLatLng);
        // get rotation angle
        marker.setIcon({
          path:
            "M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684",
          scale: 0.02,
          strokeOpacity: 1,
          strokeColor: "#000",
          strokeWeight: 1,
          fillColor: "#E5E5E5",
          fillOpacity: 1,
          rotation: getRotationAngle(heading),
        });
      } else {
        // otherwise if this is a new marker, rotation is left blank
        marker.setIcon({
          path:
            "M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684",
          scale: 0.02,
          strokeOpacity: 1,
          strokeColor: "#000",
          strokeWeight: 1,
          fillColor: "#E5E5E5",
          fillOpacity: 1,
        });
      }

      // add event listener that selects the marker when it is clicked
      google.maps.event.addListener(marker, "click", function () {
        setSelection(marker);
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

      // cache the position tick
      $fdpsFeedCache[fdpsPositionTick.aircraftIdentifier] = fdpsPositionTick;
    });
  }

  function clearMapSelection() {
    if ($mapCurrentSelection) {
      if ($mapCurrentSelection.type == "rectangle") {
        $mapCurrentSelection.setOptions({ fillColor: "#1c64f2" });
        $mapCurrentSelection = null;
      } else {
        $mapCurrentSelection = null;
      }
    }
  }

  function setSelection(shape) {
    clearMapSelection();
    $mapCurrentSelection = shape;
  }
</script>
