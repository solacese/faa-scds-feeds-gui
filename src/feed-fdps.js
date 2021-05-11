export function parseFdpsPositionTick(message) {
  return parseFdpsPositionTopicArray(createTopicArray(message.getDestination().getName()));
}

function parseFdpsPositionTopicArray(topicArray) {
  return {
    root: topicArray[0],
    feed: topicArray[1],
    identifier: topicArray[2],
    fdpsFlightStatus: topicArray[3],
    aircraftIdentifier: topicArray[4],
    airportDeparture: topicArray[5],
    airportDestination: topicArray[6],
    lat: removePadding(topicArray[7]),
    lon: removePadding(topicArray[8]),
    actualSpeed: topicArray[9],
    altitude: topicArray[10],
    trackVelocityX: topicArray[11],
    trackVelocityY: topicArray[12],
  };
}

function createTopicArray(topic) {
  return topic.split("/");
}

function removePadding(numAsString) {
  if (numAsString.includes("-") && numAsString.charAt(1) == "0") {
    let positionInStrToRemove = 1;
    return "-" + numAsString.substring(positionInStrToRemove + 1, numAsString.length + 1);
  } else if (numAsString.charAt(0) == "0") {
    return numAsString.substring(1);
  }

  return numAsString; // silent parse error for now
}

export function getRotationAngle(heading) {
  let angle = 0;
  try {
    if (heading == 0) {
      angle = 0;
    } else {
      angle = Math.round((Math.round(parseFloat(heading) / 10) / 10) * 100);
      if (angle > 360) {
        angle = 0;
      }
    }
  } catch (e) {
    angle = 0;
    console.debug("Exception: " + e);
  }
  console.debug("Angle: " + angle);
  return angle;
}
