const XidLength = 20;
const XidPattern = "[0-9a-v]{20}";

export function generateFlagshipId() {
  const id = Math.floor(Math.random() * Date.now());

  console.log("Flagship SDK generated Visitor ID: ", id);

  return id.toString();
}

export function checkValidityPatternForEnvId(envId) {
  /// Check pattren for envId (xid)
  return envId.length === XidLength && envId.match(XidPattern);
}
