import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("FK_companies_system.ksics", ["ksic"], {})
@Entity("companies", { schema: "bom" })
export class Companies {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("char", { name: "ksic", nullable: true, length: 2 })
  ksic: string | null;

  @OneToMany(() => Users, (users) => users.company)
  users: Users[];
}
