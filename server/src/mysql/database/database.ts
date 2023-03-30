import { Database } from "@upvotr/mysql-query-builder";
import { config } from "../../loadedConfig";
import {
  commentAutoIncrementTrigger,
  commentOnUpdateTrigger,
  comments
} from "./tables/comments";
import { postOnUpdateTrigger, posts } from "./tables/posts";
import { roleDefinitions, roles } from "./tables/roles";
import { sessionsRemoveExpiredEvent, sessions } from "./tables/sessions";
import { tagDefinitions, tags } from "./tables/tags";
import { users } from "./tables/users";
import { webhooks } from "./tables/webhooks";
import { initVersion, version } from "./tables/version";
import { notifications } from "./tables/notifications";
import { initSettings } from "./tables/settings";

export const tables = [
  comments,
  posts,
  roles,
  roleDefinitions,
  sessions,
  tags,
  tagDefinitions,
  users,
  webhooks,
  notifications,
  version
];

export const database = new Database(config.mysql.database.name, tables);

export const setupDatabase = `${database.create(true)};
${database.use()};
${version.create(true)};
${initVersion};`;

export const autoconfigureDatabase = `${database
  .ensureTables(
    tables
      .map((table) => table.rawName())
      .filter((table) => table !== version.rawName())
  )
  .join(";\n")};
${initSettings};
${commentAutoIncrementTrigger};
${commentOnUpdateTrigger};
${postOnUpdateTrigger};
${sessionsRemoveExpiredEvent};`;
