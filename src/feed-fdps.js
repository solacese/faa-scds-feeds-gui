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

export function getRotatedIconUrl(fdpsPositionTick) {
  const heading = radiansToDegrees(
    Math.atan(Number(fdpsPositionTick.trackVelocityY) / Number(fdpsPositionTick.trackVelocityX))
  );
  let iconAngle = "0";
  if (heading > 22.5 && heading < 67.5) {
    iconAngle = "45";
  }
  if (heading > 67.5 && heading < 112.5) {
    iconAngle = "90";
  }
  if (heading > 112.5 && heading < 157.5) {
    iconAngle = "135";
  }
  if (heading > 157.5 && heading < 202.5) {
    iconAngle = "180";
  }
  if (heading > 202.5 && heading < 247.5) {
    iconAngle = "225";
  }
  if (heading > 247.5 && heading < 292.5) {
    iconAngle = "270";
  }
  if (heading > 292.5 && heading < 337.5) {
    iconAngle = "315";
  }
  return `/images/plane-${iconAngle}.png`;
}

function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}
