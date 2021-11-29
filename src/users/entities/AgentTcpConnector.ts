import { Column, Entity, OneToMany } from "typeorm";
import { Agent } from "./Agent";

@Entity("agent_tcp_connector", { schema: "bom" })
export class AgentTcpConnector {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "logging_time", nullable: true, default: () => "'1'" })
  loggingTime: number | null;

  @Column("int", { name: "timeout", nullable: true, default: () => "'1000'" })
  timeout: number | null;

  @Column("int", {
    name: "recovery_time",
    nullable: true,
    default: () => "'3'",
  })
  recoveryTime: number | null;

  @Column("int", {
    name: "count_reconn",
    nullable: true,
    default: () => "'60'",
  })
  countReconn: number | null;

  @OneToMany(() => Agent, (agent) => agent.tcpConnector2)
  agents: Agent[];
}
