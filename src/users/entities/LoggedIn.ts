import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("nix-logged_in-user", ["userId"], {})
@Entity("logged_in", { schema: "bom" })
export class LoggedIn {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "user_id", nullable: true, unsigned: true })
  userId: number | null;

  @Column("datetime", { name: "created", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column("varchar", { name: "remote_address", nullable: true, length: 255 })
  remoteAddress: string | null;

  @ManyToOne(() => Users, (users) => users.loggedIns, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
