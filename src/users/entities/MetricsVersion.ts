import { Column, Entity } from "typeorm";

@Entity("metrics_version", { schema: "bom" })
export class MetricsVersion {
  @Column("int", { primary: true, name: "id", default: () => "'0'" })
  id: number;

  @Column("varchar", { name: "version_name", length: 50 })
  versionName: string;

  @Column("varchar", { name: "faciliy_type_name", length: 50 })
  faciliyTypeName: string;
}
