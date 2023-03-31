import { PersistManager, Runner, createModule } from "@upvotr/node-hmr";
import { webhooks } from "../database/tables/webhooks";
import { QueryGenerator } from "./queryGenerator";

const webhookQueries = createModule(
  new PersistManager(),
  new Runner(() => {
    const addWebhook = ((trigger: number, url: string) => [
      /* sql */ `INSERT INTO ${webhooks} (${webhooks.column(
        "trigger"
      )}, ${webhooks.column("url")}) VALUES(?, ?)`,
      [trigger, url]
    ]) satisfies QueryGenerator;

    const updateWebhook = ((
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

    const removeWebhook = ((webhookId: number) => [
      /* sql */ `DELETE FROM ${webhooks} WHERE ${webhooks.column(
        "webhookId"
      )} = ?`,
      [webhookId]
    ]) satisfies QueryGenerator;

    return {
      addWebhook,
      updateWebhook,
      removeWebhook
    };
  }),
  false
);

export = webhookQueries;
