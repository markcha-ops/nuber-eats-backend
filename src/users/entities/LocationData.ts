import { Column, Entity, Index } from "typeorm";

@Index("FK_location_data_wolk_place", ["wpId"], {})
@Entity("location_data", { schema: "bom" })
export class LocationData {
  @Column("int", { name: "wp_id", default: () => "'0'" })
  wpId: number;

  @Column("int", { name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("int", { name: "level", nullable: true, default: () => "'0'" })
  level: number | null;
}
