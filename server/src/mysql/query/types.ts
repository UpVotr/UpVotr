import { Table } from "@upvotr/mysql-query-builder";
import type { RowDataPacket } from "mysql2";
import { comments } from "../database/tables/comments";
import { notifications } from "../database/tables/notifications";
import { posts } from "../database/tables/posts";
import { roleDefinitions, roles } from "../database/tables/roles";
import { sessions } from "../database/tables/sessions";
import { settings } from "../database/tables/settings";
import { tags, tagDefinitions } from "../database/tables/tags";
import { users } from "../database/tables/users";
import { version } from "../database/tables/version";
import { webhooks } from "../database/tables/webhooks";

export type Comment = Table.RowType<typeof comments>;
export type CommentRow = Comment & RowDataPacket;

export type Notification = Table.RowType<typeof notifications>;
export type NotificationRow = Notification & RowDataPacket;

export type Post = Table.RowType<typeof posts>;
export type PostRow = Post & RowDataPacket;

export type Role = Table.RowType<typeof roles>;
export type RoleRow = Role & RowDataPacket;
export type RoleDefinition = Table.RowType<typeof roleDefinitions>;
export type RoleDefinitionRow = RoleDefinition & RowDataPacket;

export type Session = Table.RowType<typeof sessions>;
export type SessionRow = Session & RowDataPacket;

export type Settings = Table.RowType<typeof settings>;
export type SettingsRow = Settings & RowDataPacket;

export type Tag = Table.RowType<typeof tags>;
export type TagRow = Tag & RowDataPacket;
export type TagDefinition = Table.RowType<typeof tagDefinitions>;
export type TagDefinitionRow = TagDefinition & RowDataPacket;

export type UserData = Table.RowType<typeof users>;
export type UserDataRow = UserData & RowDataPacket;

export type Version = Table.RowType<typeof version>;
export type VersionRow = Version & RowDataPacket;

export type Webhook = Table.RowType<typeof webhooks>;
export type WebhookRow = Webhook & RowDataPacket;
