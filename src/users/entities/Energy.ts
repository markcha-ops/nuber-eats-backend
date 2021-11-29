import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("energy", { schema: "bom" })
export class Energy {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "에너지 아이디" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("double", { name: "MJ", comment: "MJ 기준", precision: 22 })
  mj: number;

  @Column("double", { name: "kcal", comment: "칼로리 기준", precision: 22 })
  kcal: number;

  @Column("double", { name: "toe", comment: "TOE 기준", precision: 22 })
  toe: number;

  @Column("double", { name: "tCO2", comment: "CO2 기준", precision: 22 })
  tCo2: number;
}
