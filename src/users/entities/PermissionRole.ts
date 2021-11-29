import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permissions } from "./Permissions";
import { Roles } from "./Roles";

@Index("uix_permission_role", ["permissionId", "roleId"], { unique: true })
@Index("FK_permission_role_roles", ["roleId"], {})
@Entity("permission_role", { schema: "bom" })
export class PermissionRole {
  @PrimaryGeneratedColumn({ type: "int", name: "permission_id" })
  permissionId: number;

  @Column("int", { primary: true, name: "role_id" })
  roleId: number;

  @Column("enum", { name: "grant", enum: ["Y", "N"], default: () => "'N'" })
  grant: "Y" | "N";

  @ManyToOne(() => Permissions, (permissions) => permissions.permissionRoles, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
  permission: Permissions;

  @ManyToOne(() => Roles, (roles) => roles.permissionRoles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;
}
