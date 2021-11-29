import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionRole } from "./PermissionRole";
import { PermissionUser } from "./PermissionUser";

@Entity("permissions", { schema: "bom" })
export class Permissions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "module", length: 150 })
  module: string;

  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @Column("varchar", { name: "key", length: 50 })
  key: string;

  @OneToMany(
    () => PermissionRole,
    (permissionRole) => permissionRole.permission
  )
  permissionRoles: PermissionRole[];

  @OneToMany(
    () => PermissionUser,
    (permissionUser) => permissionUser.permission
  )
  permissionUsers: PermissionUser[];
}
