// google.maps.LatLng class  https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLng
// google.maps.LatLngBounds class https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds
// google.maps.Rectangle class https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle

export function createFdpsSubscriptionList(rectanglesMap) {
  // guard: if there are no rectangle filters subscribe to the entire feed
  if (rectanglesMap.size == 0) {
    return { "FDPS/position/>": true };
  }
  // generate subscription list from the array of rectangles
  let topicFilters = {};
  rectanglesMap.forEach((rectangle, key, map) => {
    const northEastLatLng = rectangle.getBounds().getNorthEast();
    const southWestLatLng = rectangle.getBounds().getSouthWest();
    const minLat = southWestLatLng.lat();
    const maxLat = northEastLatLng.lat();
    const minLng = southWestLatLng.lng();
    const maxLng = northEastLatLng.lng();
    const diffLat = maxLat - minLat;
    const diffLng = maxLng - minLng;
    const latDecimalPlace = getWildcardDecimalPlace(diffLat);
    const lngDecimalPlace = getWildcardDecimalPlace(diffLng);
    // form array of points that correspond to rectangles of subscription coverage on the map
    // the subscription coverage is determined by the decimal point where the "*" wildcard filter symbol is located
    // moving one decimal place to the left corresponds to a factor of 10 growth in the subscription coverage area
    // see viz here: TODO
    const { templateCols, templateRows } = createSubscriptionGrid_OVERCOVERAGE(
      minLat,
      maxLat,
      minLng,
      maxLng,
      latDecimalPlace,
      lngDecimalPlace
    );
    // convert grid of points to an array of topic filter strings
    for (const pointLng of templateCols) {
      for (const pointLat of templateRows) {
        const filterLat = getTopicFilter(pointLat, latDecimalPlace);
        const filterLng = getTopicFilter(pointLng, lngDecimalPlace);
        topicFilters[`FDPS/position/*/*/*/${filterLat}/${filterLng}/*/*/*/*`] = true;
      }
    }
  });
  return topicFilters;
}

function getWildcardDecimalPlace(distance) {
  let absDistance = Math.abs(distance);
  let decimalPlace;
  if (absDistance >= 10) {
    decimalPlace = 1;
  } else if (absDistance >= 1) {
    decimalPlace = 1;
  } else if (absDistance >= 0) {
    decimalPlace = 0.1;
  } else if (absDistance >= 0.1) {
    decimalPlace = 0.01;
  } else if (absDistance >= 0.01) {
    decimalPlace = 0.001;
  } else if (absDistance >= 0.001) {
    decimalPlace = 0.0001;
  } else {
    // handle 5 decimal points
    decimalPlace = 0.00001;
  }
  return decimalPlace;
}

function getTopicFilter(point, decimalPlace) {
  // Developer note:
  // Keeping the decimal place as a Number is convenient for forming the grid, ...
  // ... but we need to convert it back to a string/array to create a topic filter string.
  // I guess could index the decimal places, but I don't think it's necessary for this.

  const pointArray = point.toFixed(5).toString().split("");
  const decimalPointIndex = pointArray.indexOf(".");

  if (decimalPlace >= 10) {
    pointArray[decimalPointIndex - 1] = "*";
    return pointArray.slice(0, decimalPointIndex).join("");
  } else if (decimalPlace >= 1) {
    pointArray[decimalPointIndex + 1] = "*";
    return pointArray.slice(0, decimalPointIndex + 2).join("");
  } else if (decimalPlace >= 0.1) {
    pointArray[decimalPointIndex + 2] = "*";
    return pointArray.slice(0, decimalPointIndex + 3).join("");
  } else if (decimalPlace >= 0.01) {
    pointArray[decimalPointIndex + 3] = "*";
    return pointArray.slice(0, decimalPointIndex + 4).join("");
  } else if (decimalPlace >= 0.001) {
    pointArray[decimalPointIndex + 4] = "*";
    return pointArray.slice(0, decimalPointIndex + 5).join("");
  } else {
    return pointArray.slice(0, decimalPointIndex + 5).join("");
  }
}

function createSubscriptionGrid_OVERCOVERAGE(minLat, maxLat, minLng, maxLng, latDecimalPlace, lngDecimalPlace) {
  // template rows = latitude
  let templateRows = [];
  let currentLat = minLat;
  templateRows.push(currentLat);
  while (currentLat <= maxLat) {
    currentLat = currentLat + latDecimalPlace;
    templateRows.push(currentLat);
  }
  // template cols = lnggitude
  let templateCols = [];
  let currentLng = minLng;
  templateCols.push(currentLng);
  while (currentLng <= maxLng) {
    currentLng = currentLng + lngDecimalPlace;
    templateCols.push(currentLng);
  }
  return {
    templateCols,
    templateRows,
  };
}

export function containedByOneOrMoreRectangleBounds(latLngObj, rectanglesMap) {
  // if there are no filters, always return true
  if (rectanglesMap.size == 0) {
    return true;
  }
  // if there are filters, check the point against all of them
  let isContained = false;
  rectanglesMap.forEach((rectangle, key, map) => {
    if (rectangle.getBounds().contains(latLngObj)) {
      isContained = true;
    }
  });
  return isContained;
}
