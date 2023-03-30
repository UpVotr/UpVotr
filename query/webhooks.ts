import { Table } from "@upvotr/mysql-query-builder";
import { webhooks } from "../server/src/mysql/database/tables/webhooks";
import { RowDataPacket } from "mysql2";
import { QueryGenerator } from "./queryGenerator";

export type Webhook = Table.RowType<typeof webhooks>;

export type WebhookRow = Webhook & RowDataPacket;

export const addWebhook = ((trigger: number, url: string) => [
  `INSERT INTO ${webhooks} (${webhooks.column("trigger")}, ${webhooks.column(
    "url"
  )}) VALUES(?, ?)`,
  [trigger, url]
]) satisfies QueryGenerator;

export const updateWebhook = ((
  webhookId: number,
  trigger?: number,
  url?: string
) => [
  `UPDATE ${webhooks} SET ${webhooks.column(
    "trigger"
  )} = COALESCE(?, ${webhooks.column("trigger")}), ${webhooks.column(
    "url"
  )} = COALESCE(?, ${webhooks.column("url")}) WHERE ${webhooks.column(
    "webhookId"
  )} = ?`,
  [trigger ?? null, url ?? null, webhookId]
]) satisfies QueryGenerator;

export const removeWebhook = ((webhookId: number) => [
  `DELETE FROM ${webhooks} WHERE ${webhooks.column("webhookId")} = ?`,
  [webhookId]
]) satisfies QueryGenerator;
