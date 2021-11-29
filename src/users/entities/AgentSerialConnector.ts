import { Column, Entity, OneToMany } from "typeorm";
import { Agent } from "./Agent";

@Entity("agent_serial_connector", { schema: "bom" })
export class AgentSerialConnector {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "logging_time", default: () => "'1'" })
  loggingTime: number;

  @Column("int", { name: "baud_late", nullable: true, default: () => "'9600'" })
  baudLate: number | null;

  @Column("varchar", { name: "serial_port", length: 50 })
  serialPort: string;

  @Column("enum", {
    name: "serial_type",
    enum: ["RTU", "RTU-BUFFERD", "ASCII"],
    default: () => "'RTU-BUFFERD'",
  })
  serialType: "RTU" | "RTU-BUFFERD" | "ASCII";

  @Column("int", { name: "data_bit", nullable: true })
  dataBit: number | null;

  @Column("int", { name: "stop_bit", nullable: true })
  stopBit: number | null;

  @Column("int", { name: "parity", nullable: true })
  parity: number | null;

  @Column("int", { name: "timeout", nullable: true })
  timeout: number | null;

  @Column("int", { name: "reconn_count", nullable: true })
  reconnCount: number | null;

  @Column("int", { name: "recovery_time", nullable: true })
  recoveryTime: number | null;

  @OneToMany(() => Agent, (agent) => agent.serialConnector2)
  agents: Agent[];
}
