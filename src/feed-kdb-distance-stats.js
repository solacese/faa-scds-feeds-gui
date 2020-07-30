export function parseDistanceBatchEvent(message) {
  let container = message.getSdtContainer();
  if (container != null) {
    return JSON.parse(container.getValue());
  } else {
    return JSON.parse(message.getBinaryAttachment());
  }
}
