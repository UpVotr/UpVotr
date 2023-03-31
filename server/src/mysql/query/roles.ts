import { PersistManager, Runner, createModule } from "@upvotr/node-hmr";
import { roleDefinitions, roles } from "../database/tables/roles";
import { QueryGenerator } from "./queryGenerator";

const roleQueries = createModule(
  new PersistManager(),
  new Runner(() => {
    const addRoleToUser = ((userId: string, roleId: number) => [
      /* sql */ `INSERT IGNORE INTO ${roles} (${roles.column(
        "userId"
      )}, ${roles.column("roleId")}) VALUES (?, ?)`,
      [userId, roleId]
    ]) satisfies QueryGenerator;

    const removeRoleFromUser = ((userId: string, roleId: number) => [
      /* sql */ `DELETE FROM ${roles} WHERE ${roles.column(
        "userId"
      )} = ? AND ${roles.column("roleId")} = ?`,
      [userId, roleId]
    ]) satisfies QueryGenerator;

    const removeRoleFromAllUsers = ((roleId: number) => [
      /* sql */ `DELETE FROM ${roles} WHERE ${roles.column("roleId")} = ?`,
      [roleId]
    ]) satisfies QueryGenerator;

    const defineRole = ((
      roleName: string,
      permissionFlags: number,
      color?: string
    ) => [
      /* sql */ `INSERT INTO ${roleDefinitions} (${roleDefinitions.column(
        "roleName"
      )}, ${roleDefinitions.column(
        "permissionFlags"
      )}, ${roleDefinitions.column("color")}) VALUES (?, ?, ?)`,
      [roleName, permissionFlags, color ?? null]
    ]) satisfies QueryGenerator;

    const deleteRole = ((roleId: number) => [
      /* sql */ `DELETE FROM ${roleDefinitions} WHERE ${roleDefinitions.column(
        "roleId"
      )} = ?`,
      [roleId]
    ]) satisfies QueryGenerator;

    const addRolePermissions = ((roleId: number, permissions: number) => [
      /* sql */ `UPDATE ${roleDefinitions} SET ${roleDefinitions.column(
        "permissionFlags"
      )} = BIT_OR(${roleDefinitions.column(
        "permissionFlags"
      )}, ?) WHERE ${roleDefinitions.column("roleId")} = ?`,
      [permissions, roleId]
    ]) satisfies QueryGenerator;

    const removeRolePermissions = ((roleId: number, permissions: number) => [
      /* sql */ `UPDATE ${roleDefinitions} SET ${roleDefinitions.column(
        "permissionFlags"
      )} = BIT_AND(${roleDefinitions.column(
        "permissionFlags"
      )}, ?) WHERE ${roleDefinitions.column("roleId")} = ?`,
      [(~permissions >>> 0) & 0xff, roleId]
    ]) satisfies QueryGenerator;

    return {
      addRoleToUser,
      removeRoleFromUser,
      removeRoleFromAllUsers,
      defineRole,
      deleteRole,
      addRolePermissions,
      removeRolePermissions
    };
  }),
  false
);

export = roleQueries;
