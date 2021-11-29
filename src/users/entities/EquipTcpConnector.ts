import { Column, Entity } from "typeorm";

@Entity("equip_tcp_connector", { schema: "bom" })
export class EquipTcpConnector {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "device_id" })
  deviceId: number;

  @Column("varchar", { name: "ip", length: 50 })
  ip: string;

  @Column("int", { name: "port" })
  port: number;
}
