import { query } from "../connection";
import { autoconfigureDatabase } from "../database/database";
import { Version } from "../../../../query/types";
import { unknownVersion } from "./errors";

export async function handleV0Migrate(
  old: Version,
  cur: Version
): Promise<Version> {
  if (old.minor === 0) {
    await query(autoconfigureDatabase);
    return cur;
  }

  throw unknownVersion();
}
