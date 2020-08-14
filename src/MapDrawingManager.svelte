<script>
  import { debounce } from "./debounce";
  import { fdpsFeedCache, filters, markers, markerCluster, mapCurrentSelection, mapUpdateBatch } from "./stores";

  export let map;

  const activeColor = "#08AC92";
  const inactiveColor = "#1c64f2";

  let drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ["rectangle"],
    },
    drawingMode: "rectangle",
    rectangleOptions: {
      fillColor: activeColor,
      fillOpacity: 0.35,
      strokeWeight: 3,
      draggable: true,
      editable: true,
      zIndex: 1,
    },
  });

  function clearMap() {
    $fdpsFeedCache = {};
    $markerCluster.clearMarkers();
    $markers = {};
    $mapUpdateBatch = { add: {}, remove: {} };
  }

  function clearSelection() {
    if ($mapCurrentSelection) {
      if ($mapCurrentSelection.type == "rectangle") {
        $mapCurrentSelection.setOptions({ fillColor: inactiveColor });
        $mapCurrentSelection = null;
      }
    }
  }

  function setSelection(shape) {
    clearSelection();
    $mapCurrentSelection = shape;
    $mapCurrentSelection.setOptions({ fillColor: activeColor });
  }

  function deleteCurrentSelection() {
    if ($mapCurrentSelection) {
      $mapCurrentSelection.setMap(null);
      $mapCurrentSelection = null;
    }
  }

  function deleteAllShapes() {
    $filters.forEach((rectangle, key, map) => {
      rectangle.setMap(null);
    });
    $filters = new Map();
  }

  function addRectangle(rectangle) {
    $filters.set(rectangle, rectangle);
    $filters = $filters;
  }

  function saveRectangle(rectangle) {
    addRectangle(rectangle);
    clearMap();
  }

  const debouncedSaveRectangle = (rectangle) => debounce(() => saveRectangle(rectangle), 500);

  google.maps.event.addListener(drawingManager, "rectanglecomplete", function (rectangle) {
    // add type property to identify the overlay as a rectangle
    rectangle.type = "rectangle";

    // update $filters with newly drawn rectangle and clear map
    saveRectangle(rectangle);

    // set selection to the newly drawn rectangle
    setSelection(rectangle);

    // add event listeners that keeps $filters in sync with user edits
    google.maps.event.addListener(rectangle, "dragend", function () {
      saveRectangle(rectangle);
    });
    /*
      The bounds_changed event is called hundreds of times as a user edits a shape,
      so we need to debounce whatever handler we call in event callback.
      Read the comments in debounce.js to learn more about what it means to debounce something.
     */
    const boundsChangedHandler = debouncedSaveRectangle(rectangle);
    google.maps.event.addListener(rectangle, "bounds_changed", function () {
      boundsChangedHandler();
    });

    // add event listener that selects the rectangle when it is dragged
    google.maps.event.addListener(rectangle, "dragstart", function () {
      setSelection(rectangle);
    });

    // add event listener that selects the rectangle when it is clicked
    google.maps.event.addListener(rectangle, "click", function () {
      setSelection(rectangle);
    });
  });

  // add event listeners that clear the current selection when the drawing mode is changed,
  // or when the map is clicked
  google.maps.event.addListener(drawingManager, "drawingmode_changed", clearSelection);
  google.maps.event.addListener(map, "click", clearSelection);

  drawingManager.setMap(map);
</script>

<div class="flex items-center justify-center h-full">
  <button
    aria-label="Delete"
    on:click={deleteCurrentSelection}
    type="button"
    class="inline-flex items-center p-1 text-base font-medium text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700">
    <span class="w-4 h-4">
      <svg
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1
          0 00-1 1v3M4 7h16" />
      </svg>
    </span>
  </button>
  <button
    aria-label="Clear"
    on:click={deleteAllShapes}
    type="button"
    class="inline-flex items-center p-1 text-base font-medium text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700">
    <span class="w-4 h-4">
      <svg
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 79.707 79.707"
        xml:space="preserve">
        <path
          d="M67.239,79.707l-8.41-28.273c-0.207-7.525-4.795-13.963-11.309-16.849V7.667C47.52,3.439,44.081,0,39.853,0
          c-4.227,0-7.666,3.439-7.666,7.667v26.918c-6.513,2.886-11.099,9.323-11.306,16.844l-8.413,28.275h54.771
          C67.239,79.704,67.239,79.707,67.239,79.707z M54.429,73.707l-3.431-12.806c-0.287-1.065-1.377-1.704-2.449-1.413
          c-1.067,0.284-1.7,1.381-1.414,2.448l3.152,11.771h-8.436v-12.29c0-1.104-0.896-2-2-2s-2,0.896-2,2v12.287h-7.435l3.153-11.771
          c0.286-1.065-0.347-2.164-1.414-2.449c-1.068-0.289-2.164,0.349-2.449,1.414l-3.431,12.806H20.51l5.579-18.75
          c0.004,0,0.008,0,0.012,0h27.5c0.004,0,0.008,0,0.015,0l5.575,18.75h-4.763L54.429,73.707L54.429,73.707z
          M38.187,7.667
          C38.187,6.748,38.935,6,39.853,6c0.919,0,1.667,0.748,1.667,1.667V33.04c-0.55-0.048-1.104-0.084-1.666-0.084
          s-1.117,0.036-1.667,0.084V7.667z
          M39.854,38.956c6.135,0,11.275,4.276,12.637,10H27.217C28.577,43.231,33.72,38.956,39.854,38.956 z" />
      </svg>
    </span>
  </button>
</div>
