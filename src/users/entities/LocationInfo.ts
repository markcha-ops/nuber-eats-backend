import { Column, Entity, Index } from "typeorm";

@Index("pk_id_id", ["id"], { unique: true })
@Entity("location_info", { schema: "bom" })
export class LocationInfo {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "lv1", nullable: true })
  lv1: number | null;

  @Column("int", { name: "lv2", nullable: true })
  lv2: number | null;

  @Column("int", { name: "lv3", nullable: true })
  lv3: number | null;

  @Column("int", { name: "lv4", nullable: true })
  lv4: number | null;

  @Column("int", { name: "lv5", nullable: true })
  lv5: number | null;
}
