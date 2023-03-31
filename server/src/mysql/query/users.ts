import { PersistManager, Runner, createModule } from "@upvotr/node-hmr";
import { users } from "../database/tables/users";
import { QueryGenerator } from "./queryGenerator";

const userQueries = createModule(
  new PersistManager(),
  new Runner(() => {
    const createUser = ((
      uuid: string,
      authProvider: number,
      displayName: string,
      avatarURL: string
    ) => [
      /* sql */ `INSERT INTO ${users} (${users.column(
        "userId"
      )}, ${users.column("authProvider")}, ${users.column(
        "displayName"
      )}, ${users.column("avatarURL")}) VALUES(?, ?, ?, ?)`,
      [uuid, authProvider, displayName, avatarURL]
    ]) satisfies QueryGenerator;

    const deleteUser = ((uuid: string) => [
      /* sql */ `DELETE FROM ${users} WHERE ${users.column("userId")} = ?`,
      [uuid]
    ]) satisfies QueryGenerator;

    const getUser = ((
      uuid: string,
      columns: Parameters<(typeof users)["column"]>[0][]
    ) => [
      /* sql */ `SELECT ${columns
        .map(users.column)
        .join(", ")} FROM ${users} WHERE ${users.column("userId")} = ?`,
      [uuid]
    ]) satisfies QueryGenerator;

    const updateUserProfile = ((
      uuid: string,
      displayName: string,
      avatarURL: string
    ) => [
      /* sql */ `UPDATE ${users} SET ${users.column(
        "displayName"
      )} = ?, ${users.column("avatarURL")} = ? WHERE ${users.column(
        "userId"
      )} = ?`,
      [displayName, avatarURL, uuid]
    ]) satisfies QueryGenerator;

    const setAnonymous = ((uuid: string, anonymous: boolean) => [
      /* sql */ `UPDATE ${users} SET ${users.column(
        "anonymous"
      )} = ? WHERE ${users.column("userId")} = ?`,
      [anonymous, uuid]
    ]) satisfies QueryGenerator;

    const setInvisible = ((uuid: string, invisible: boolean) => [
      /* sql */ `UPDATE ${users} SET ${users.column(
        "invisible"
      )} = ? WHERE ${users.column("userId")} = ?`,
      [invisible, uuid]
    ]) satisfies QueryGenerator;

    const touchUser = ((uuid: string) => [
      /* sql */ `UPDATE ${users} SET ${users.column(
        "lastOnline"
      )} = CURRENT_TIMESTAMP WHERE ${users.column("userId")} = ?`,
      [uuid]
    ]) satisfies QueryGenerator;

    return {
      createUser,
      deleteUser,
      getUser,
      updateUserProfile,
      setAnonymous,
      setInvisible,
      touchUser
    };
  }),
  false
);

export = userQueries;
