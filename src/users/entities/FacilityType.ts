import { Column, Entity } from "typeorm";

@Entity("facility_type", { schema: "bom" })
export class FacilityType {
  @Column("varchar", { primary: true, name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "name_kr", length: 50 })
  nameKr: string;

  @Column("varchar", { name: "description", nullable: true, length: 100 })
  description: string | null;

  @Column("datetime", {
    name: "created",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  created: Date | null;

  @Column("datetime", {
    name: " updated",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updated: Date | null;
}
