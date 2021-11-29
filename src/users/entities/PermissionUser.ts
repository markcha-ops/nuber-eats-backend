import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Permissions } from "./Permissions";
import { Users } from "./Users";

@Index("FK_permission_user_users", ["userId"], {})
@Entity("permission_user", { schema: "bom" })
export class PermissionUser {
  @Column("int", { primary: true, name: "permission_id" })
  permissionId: number;

  @Column("int", { primary: true, name: "user_id", unsigned: true })
  userId: number;

  @Column("enum", { name: "grant", enum: ["Y", "N"], default: () => "'N'" })
  grant: "Y" | "N";

  @ManyToOne(() => Permissions, (permissions) => permissions.permissionUsers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
  permission: Permissions;

  @ManyToOne(() => Users, (users) => users.permissionUsers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
