export default function keymirror<Key extends string>(
  keys: Key[]
): {
  [k in Key]: k;
} {
  return Object.fromEntries(keys.map((key) => [key, key])) as {
    [k in Key]: k;
  };
}
