import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("utility", { schema: "bom" })
export class Utility {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("int", { name: "brand_id", nullable: true, comment: "제조사" })
  brandId: number | null;

  @Column("varchar", { name: "model_name", nullable: true, length: 50 })
  modelName: string | null;

  @Column("varchar", {
    name: "matrics_version_name",
    comment: "설비 종류에 따른 메트릭 버전 선택",
    length: 50,
  })
  matricsVersionName: string;

  @Column("varchar", { name: "faility_type_name", nullable: true, length: 50 })
  failityTypeName: string | null;
}
