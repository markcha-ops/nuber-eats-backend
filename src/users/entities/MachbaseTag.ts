import { Column, Entity } from "typeorm";

@Entity("machbase_tag", { schema: "bom" })
export class MachbaseTag {
  @Column("int", { name: "wp_id", nullable: true })
  wpId: number | null;

  @Column("varchar", { name: "lv1", nullable: true, length: 50 })
  lv1: string | null;

  @Column("varchar", { name: "lv2", nullable: true, length: 50 })
  lv2: string | null;

  @Column("varchar", { name: "lv3", nullable: true, length: 50 })
  lv3: string | null;

  @Column("varchar", { name: "lv4", nullable: true, length: 50 })
  lv4: string | null;

  @Column("varchar", { name: "lv5", nullable: true, length: 50 })
  lv5: string | null;

  @Column("int", { name: "energy", nullable: true })
  energy: number | null;

  @Column("varchar", { name: "energy_purpose", nullable: true, length: 10 })
  energyPurpose: string | null;

  @Column("tinyint", { name: "is_trend", nullable: true })
  isTrend: number | null;

  @Column("varchar", { name: "matrics", length: 15 })
  matrics: string;

  @Column("varchar", { name: "nick_name", nullable: true, length: 30 })
  nickName: string | null;

  @Column("varchar", { name: "tag_code", nullable: true, length: 30 })
  tagCode: string | null;

  @Column("varchar", { name: "tag_name", nullable: true, length: 50 })
  tagName: string | null;
}
