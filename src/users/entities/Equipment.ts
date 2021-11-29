import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TagCodes } from "./TagCodes";

@Index("fk-equipment-location_info", ["locaionInfo"], {})
@Index("FK_equipment_equip_tcp_connector", ["tcpConnector"], {})
@Index("FK_equipment_agent_serial_connector", ["serialConnector"], {})
@Index("FK_equipment_agent", ["agentId"], {})
@Index("FK_equipment_wolk_place", ["wpId"], {})
@Index("fk-equipment-facillities", ["utilityId"], {})
@Entity("equipment", { schema: "bom" })
export class Equipment {
  @Column("int", { name: "wp_id", nullable: true })
  wpId: number | null;

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "equipment_code", nullable: true, length: 50 })
  equipmentCode: string | null;

  @Column("int", { name: "agent_id", nullable: true })
  agentId: number | null;

  @Column("int", { name: "tcp_connector", nullable: true })
  tcpConnector: number | null;

  @Column("int", { name: "serial_connector", nullable: true })
  serialConnector: number | null;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("int", { name: "locaion_info", nullable: true })
  locaionInfo: number | null;

  @Column("int", { name: "energy", nullable: true })
  energy: number | null;

  @Column("varchar", { name: "energy_purpose", nullable: true, length: 50 })
  energyPurpose: string | null;

  @Column("int", { name: "utility_id" })
  utilityId: number;

  @Column("tinyint", { name: "is_trend", nullable: true })
  isTrend: number | null;

  @Column("int", { name: "unit_id", nullable: true })
  unitId: number | null;

  @OneToMany(() => TagCodes, (tagCodes) => tagCodes.equipment)
  tagCodes: TagCodes[];
}
