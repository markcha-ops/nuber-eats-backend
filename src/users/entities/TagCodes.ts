import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Equipment } from "./Equipment";
import { Metrics } from "./Metrics";

@Index("FK_tag_codes_metrics", ["metricsId"], {})
@Index("FK_tag_codes_equipment", ["equipmentId"], {})
@Entity("tag_codes", { schema: "bom" })
export class TagCodes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "equipment_id", nullable: true })
  equipmentId: number | null;

  @Column("int", { name: "metrics_id", nullable: true })
  metricsId: number | null;

  @Column("varchar", { name: "code", nullable: true, length: 50 })
  code: string | null;

  @ManyToOne(() => Equipment, (equipment) => equipment.tagCodes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "equipment_id", referencedColumnName: "id" }])
  equipment: Equipment;

  @ManyToOne(() => Metrics, (metrics) => metrics.tagCodes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "metrics_id", referencedColumnName: "id" }])
  metrics: Metrics;
}
