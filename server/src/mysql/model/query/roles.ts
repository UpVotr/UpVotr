import { Table } from "@upvotr/mysql-query-builder";
import { roleDefinitions, roles } from "../database/tables/roles";
import { RowDataPacket } from "mysql2";
import { QueryGenerator } from "./queryGenerator";

type Role = Table.RowType<typeof roles>;

export type RoleRow = Role & RowDataPacket;

type RoleDefinition = Table.RowType<typeof roleDefinitions>;

export type RoleDefinitionRow = RoleDefinition & RowDataPacket;

export const addRoleToUser = ((userId: string, roleId: number) => [
  `INSERT IGNORE INTO ${roles} (${roles.column("userId")}, ${roles.column(
    "roleId"
  )}) VALUES (?, ?)`,
  [userId, roleId]
]) satisfies QueryGenerator;

export const removeRoleFromUser = ((userId: string, roleId: number) => [
  `DELETE FROM ${roles} WHERE ${roles.column("userId")} = ? AND ${roles.column(
    "roleId"
  )} = ?`,
  [userId, roleId]
]) satisfies QueryGenerator;

export const removeRoleFromAllUsers = ((roleId: number) => [
  `DELETE FROM ${roles} WHERE ${roles.column("roleId")} = ?`,
  [roleId]
]) satisfies QueryGenerator;

export const defineRole = ((
  roleName: string,
  permissionFlags: number,
  color?: string
) => [
  `INSERT INTO ${roleDefinitions} (${roleDefinitions.column(
    "roleName"
  )}, ${roleDefinitions.column("permissionFlags")}, ${roleDefinitions.column(
    "color"
  )}) VALUES (?, ?, ?)`,
  [roleName, permissionFlags, color ?? null]
]) satisfies QueryGenerator;

export const deleteRole = ((roleId: number) => [
  `DELETE FROM ${roleDefinitions} WHERE ${roleDefinitions.column(
    "roleId"
  )} = ?`,
  [roleId]
]) satisfies QueryGenerator;

export const addRolePermissions = ((roleId: number, permissions: number) => [
  `UPDATE ${roleDefinitions} SET ${roleDefinitions.column(
    "permissionFlags"
  )} = BIT_OR(${roleDefinitions.column(
    "permissionFlags"
  )}, ?) WHERE ${roleDefinitions.column("roleId")} = ?`,
  [permissions, roleId]
]) satisfies QueryGenerator;

export const removeRolePermissions = ((roleId: number, permissions: number) => [
  `UPDATE ${roleDefinitions} SET ${roleDefinitions.column(
    "permissionFlags"
  )} = BIT_AND(${roleDefinitions.column(
    "permissionFlags"
  )}, ?) WHERE ${roleDefinitions.column("roleId")} = ?`,
  [(~permissions >>> 0) & 0xff, roleId]
]) satisfies QueryGenerator;
