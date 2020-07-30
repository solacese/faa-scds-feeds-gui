<script>
  import { debounce } from "./debounce";
  import { fdpsFeedCache, filters, markers, markerCluster, mapUpdateBatch } from "./stores";

  export let map;

  let drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ["rectangle"],
    },
    rectangleOptions: {
      fillColor: "#1c64f2",
      fillOpacity: 0.35,
      strokeWeight: 3,
      draggable: true,
      editable: true,
      zIndex: 1,
    },
  });

  const updateRectangle = (rectangle) => {
    // add rectangle to map of filters
    $filters.set(rectangle, rectangle);
    $filters = new Map($filters);
    // clear state
    $fdpsFeedCache = {};
    $markerCluster.clearMarkers();
    $markers = {};
    $mapUpdateBatch = { add: {}, remove: {} };
  };

  const debouncedUpdateRectangle = (rectangle) => debounce(() => updateRectangle(rectangle), 500);

  google.maps.event.addListener(drawingManager, "rectanglecomplete", function (rectangle) {
    // update rectangle on creation
    updateRectangle(rectangle);

    // form a debounced updater function by partially applying the rectangle argument
    const handleBoundsChanged = debouncedUpdateRectangle(rectangle);

    // add event listeners to the rectangle to keep filter map in sync with the user edits
    google.maps.event.addListener(rectangle, "dragend", function () {
      updateRectangle(rectangle);
    });
    google.maps.event.addListener(rectangle, "bounds_changed", function () {
      handleBoundsChanged(); // because this is debounced we don't have to worry about subscription overload
    });
  });

  drawingManager.setMap(map);
</script>
