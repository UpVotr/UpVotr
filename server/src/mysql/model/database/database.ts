import { Database } from "@upvotr/mysql-query-builder";
import { config } from "../../../liveConfig";
import { commentAutoIncrementTrigger, comments } from "./tables/comments";
import { posts } from "./tables/posts";
import { roleDefinitions, roles } from "./tables/roles";
import { sessions } from "./tables/sessions";
import { tagDefinitions, tags } from "./tables/tags";
import { users } from "./tables/users";

const tables = [
  comments,
  posts,
  roles,
  roleDefinitions,
  sessions,
  tags,
  tagDefinitions,
  users
];

export const database = new Database(config.mysql.database.name, tables);

export const configureDatabase = `${database.create(true)};
${database.use()};
${database.ensureTables(tables.map((table) => table.rawName())).join(";\n")};
${commentAutoIncrementTrigger};`;
