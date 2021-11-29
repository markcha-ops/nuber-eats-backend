import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("nodered_function", { schema: "bom" })
export class NoderedFunction {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;
}
