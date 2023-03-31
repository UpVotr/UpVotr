import versionQueries from "../query/version";
import createDebug from "debug";
import { noBackCompat } from "./errors";
import { handleV0Migrate } from "./v0";
import { query } from "../connection";
import { Version } from "../query/types";
import staticHMRImport from "../query/staticHMRImport";

const debug = createDebug("upvotr:migrate");

const { setVersion, getVersion } = staticHMRImport(versionQueries);

const formatVersion = (ver: Version) =>
  `${ver.major}.${ver.minor}.${ver.bugFix}`;

export async function handleMigrate(old: Version, cur: Version) {
  debug("Checking app versions...");
  if (
    old.major > cur.major ||
    (old.major === cur.major && old.minor > cur.minor) ||
    (old.major === cur.major &&
      old.minor === cur.minor &&
      old.bugFix > cur.bugFix)
  )
    throw noBackCompat();

  if (
    old.major < cur.major ||
    old.minor < cur.minor ||
    old.bugFix < cur.bugFix
  ) {
    await migrate(old, cur);
  }
}

async function migrate(old: Version, cur: Version) {
  debug(`Outdated version detected: ${formatVersion(old)}`);
  while (
    old.major < cur.major ||
    old.minor < cur.minor ||
    old.bugFix < cur.bugFix
  ) {
    const prev = old;
    if (old.major == 0) old = await handleV0Migrate(old, cur);
    debug(
      `Successfully handled migration from ${formatVersion(
        prev
      )} to ${formatVersion(old)}`
    );
  }
  await query(...setVersion(cur.major, cur.minor, cur.bugFix));
}
