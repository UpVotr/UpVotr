import { webhooks } from "../database/tables/webhooks";
import { QueryGenerator } from "./queryGenerator";

export const addWebhook = ((trigger: number, url: string) => [
  /* sql */ `INSERT INTO ${webhooks} (${webhooks.column(
    "trigger"
  )}, ${webhooks.column("url")}) VALUES(?, ?)`,
  [trigger, url]
]) satisfies QueryGenerator;

export const updateWebhook = ((
  webhookId: number,
  trigger?: number,
  url?: string
) => [
  /* sql */ `UPDATE ${webhooks} SET ${webhooks.column(
    "trigger"
  )} = COALESCE(?, ${webhooks.column("trigger")}), ${webhooks.column(
    "url"
  )} = COALESCE(?, ${webhooks.column("url")}) WHERE ${webhooks.column(
    "webhookId"
  )} = ?`,
  [trigger ?? null, url ?? null, webhookId]
]) satisfies QueryGenerator;

export const removeWebhook = ((webhookId: number) => [
  /* sql */ `DELETE FROM ${webhooks} WHERE ${webhooks.column("webhookId")} = ?`,
  [webhookId]
]) satisfies QueryGenerator;
