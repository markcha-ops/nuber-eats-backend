import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Workplace } from "./Workplace";

@Index("owner_id", ["ownerId"], { unique: true })
@Entity("sites", { schema: "bom" })
export class Sites {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 20 })
  name: string;

  @Column("int", { name: "owner_id", unique: true, unsigned: true })
  ownerId: number;

  @Column("varchar", {
    name: "logo",
    nullable: true,
    comment: "로고 경로",
    length: 255,
  })
  logo: string | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "last_updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUpdatedAt: Date;

  @OneToOne(() => Users, (users) => users.sites, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "owner_id", referencedColumnName: "id" }])
  owner: Users;

  @OneToMany(() => Workplace, (workplace) => workplace.site)
  workplaces: Workplace[];
}
