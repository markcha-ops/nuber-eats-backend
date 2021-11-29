import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TagCodes } from "./TagCodes";

@Index("FK_metrics_metrics_version", ["versionName", "facilityTypeName"], {})
@Index("FK_metrics_metrics_func", ["functionType"], {})
@Entity("metrics", { schema: "bom" })
export class Metrics {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "version_name", length: 50 })
  versionName: string;

  @Column("varchar", { name: "facility_type_name", length: 50 })
  facilityTypeName: string;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("enum", {
    name: "communication_type",
    comment: "통신 타입",
    enum: ["digital", "analog"],
    default: () => "'digital'",
  })
  communicationType: "digital" | "analog";

  @Column("enum", {
    name: "type",
    enum: ["read", "write"],
    default: () => "'read'",
  })
  type: "read" | "write";

  @Column("int", { name: "function_type", nullable: true })
  functionType: number | null;

  @Column("varchar", { name: "unit", length: 10 })
  unit: string;

  @Column("int", { name: "address" })
  address: number;

  @Column("int", { name: "start_bit" })
  startBit: number;

  @Column("int", { name: "tag_length" })
  tagLength: number;

  @Column("enum", {
    name: "data_type",
    enum: [
      "Unsigned Integer 16bit",
      "Unsigned Integer 32bit",
      "Unsigned Reverse Integer 32bit",
      "Unsigned Float 16bit",
      "Unsigned Float 32bit",
      "Unsigned Reverse Float 32bit",
    ],
  })
  dataType:
    | "Unsigned Integer 16bit"
    | "Unsigned Integer 32bit"
    | "Unsigned Reverse Integer 32bit"
    | "Unsigned Float 16bit"
    | "Unsigned Float 32bit"
    | "Unsigned Reverse Float 32bit";

  @Column("tinyint", { name: "read_only", default: () => "'0'" })
  readOnly: number;

  @Column("tinyint", { name: "logging", default: () => "'0'" })
  logging: number;

  @Column("tinyint", { name: "alarm", default: () => "'0'" })
  alarm: number;

  @Column("double", { name: "alarm_max", precision: 22, default: () => "'0'" })
  alarmMax: number;

  @Column("double", { name: "alarm_min", precision: 22, default: () => "'0'" })
  alarmMin: number;

  @Column("int", { name: "unit_id", nullable: true })
  unitId: number | null;

  @OneToMany(() => TagCodes, (tagCodes) => tagCodes.metrics)
  tagCodes: TagCodes[];
}
