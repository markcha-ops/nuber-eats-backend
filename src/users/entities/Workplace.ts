import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Agent } from "./Agent";
import { Sites } from "./Sites";
import { Users } from "./Users";

@Index("FK_workplace_sites", ["siteId"], {})
@Entity("workplace", { schema: "bom" })
export class Workplace {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "site_id", unsigned: true })
  siteId: number;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("varchar", { name: "code", nullable: true, length: 50 })
  code: string | null;

  @OneToMany(() => Agent, (agent) => agent.wp)
  agents: Agent[];

  @ManyToOne(() => Sites, (sites) => sites.workplaces, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "site_id", referencedColumnName: "id" }])
  site: Sites;

  @ManyToMany(() => Users, (users) => users.workplaces)
  users: Users[];
}
