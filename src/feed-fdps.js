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
    lat: topicArray[5],
    lon: topicArray[6],
    actualSpeed: topicArray[7],
    altitude: topicArray[8],
    trackVelocityX: topicArray[9],
    trackVelocityY: topicArray[10],
  };
}

function createTopicArray(topic) {
  return topic.split("/");
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
