import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AgentSerialConnector } from "./AgentSerialConnector";
import { AgentTcpConnector } from "./AgentTcpConnector";
import { Workplace } from "./Workplace";

@Index("FK_agent_agent_serial_connector", ["serialConnector"], {})
@Index("FK_agent_agent_tcp_connector", ["tcpConnector"], {})
@Index("FK_agent_wolk_place", ["wpId"], {})
@Entity("agent", { schema: "bom" })
export class Agent {
  @Column("int", { name: "wp_id", default: () => "'0'" })
  wpId: number;

  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "install_location", nullable: true, length: 50 })
  installLocation: string | null;

  @Column("enum", {
    name: "communication_type",
    comment: "통신 방식",
    enum: ["TCP", "Serial"],
    default: () => "'TCP'",
  })
  communicationType: "TCP" | "Serial";

  @Column("int", { name: "serial_connector", nullable: true })
  serialConnector: number | null;

  @Column("int", { name: "tcp_connector", nullable: true })
  tcpConnector: number | null;

  @Column("int", { name: "timeout", nullable: true })
  timeout: number | null;

  @Column("int", { name: "reconn_timeout", nullable: true })
  reconnTimeout: number | null;

  @ManyToOne(
    () => AgentSerialConnector,
    (agentSerialConnector) => agentSerialConnector.agents,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "serial_connector", referencedColumnName: "id" }])
  serialConnector2: AgentSerialConnector;

  @ManyToOne(
    () => AgentTcpConnector,
    (agentTcpConnector) => agentTcpConnector.agents,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "tcp_connector", referencedColumnName: "id" }])
  tcpConnector2: AgentTcpConnector;

  @ManyToOne(() => Workplace, (workplace) => workplace.agents, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "wp_id", referencedColumnName: "id" }])
  wp: Workplace;
}
