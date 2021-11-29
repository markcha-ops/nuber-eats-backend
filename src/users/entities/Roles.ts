import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PermissionRole } from "./PermissionRole";
import { Users } from "./Users";

@Index("uix_roles_parent_id", ["id", "parentId"], { unique: true })
@Entity("roles", { schema: "bom" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @Column("int", { name: "parent_id", nullable: true })
  parentId: number | null;

  @OneToMany(() => PermissionRole, (permissionRole) => permissionRole.role)
  permissionRoles: PermissionRole[];

  @ManyToOne(() => Roles, (roles) => roles.roles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: Roles;

  @OneToMany(() => Roles, (roles) => roles.parent)
  roles: Roles[];

  @ManyToMany(() => Users, (users) => users.roles)
  @JoinTable({
    name: "user_role",
    joinColumns: [{ name: "role_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "user_id", referencedColumnName: "id" }],
    schema: "bom",
  })
  users: Users[];
}
