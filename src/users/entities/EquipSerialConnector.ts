import { Column, Entity } from "typeorm";

@Entity("equip_serial_connector", { schema: "bom" })
export class EquipSerialConnector {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "device_id" })
  deviceId: number;
}
