export function unknownVersion() {
  return new Error(
    "Unable to migrate! Please submit a bug report at https://feedback.upvotr.io/."
  );
}

export function noBackCompat() {
  return new Error("New versions are NOT backwards-compatiable");
}
