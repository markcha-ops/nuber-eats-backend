import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { LoggedIn } from "./LoggedIn";
import { PermissionUser } from "./PermissionUser";
import { Sites } from "./Sites";
import { Roles } from "./Roles";
import { Companies } from "./Companies";
import { Workplace } from "./Workplace";

import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEnum, IsString } from 'class-validator';

enum UserRole {
  client,
  owner,
  delivery,
}
registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Index("fk_users-company", ["companyId"], {})
@Entity("users", { schema: "bom" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "username", length: 15 })
  username: string;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("varchar", { name: "create_ip", nullable: true, length: 255 })
  createIp: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 15 })
  phone: string | null;

  @Column("int", { name: "company_id", nullable: true, unsigned: true })
  companyId: number | null;

  @Column("datetime", {
    name: "last_password_changed",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastPasswordChanged: Date;

  @Column("enum", {
    name: "is_password_expired",
    enum: ["Y", "N"],
    default: () => "'N'",
  })
  isPasswordExpired: "Y" | "N";

  @Column("varchar", { name: "last_update_ip", nullable: true, length: 255 })
  lastUpdateIp: string | null;

  @Column("enum", {
    name: "is_enabled",
    enum: ["Y", "N"],
    default: () => "'N'",
  })
  isEnabled: "Y" | "N";

  @Column("datetime", { name: "created", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column("datetime", {
    name: "last_updated",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUpdated: Date;

  @Column("enum", {
    name: "is_account_expired",
    enum: ["Y", "N"],
    default: () => "'N'",
  })
  isAccountExpired: "Y" | "N";

  @Column("enum", {
    name: "is_account_locked",
    enum: ["Y", "N"],
    default: () => "'N'",
  })
  isAccountLocked: "Y" | "N";

  @Column("enum", {
    name: "is_withdraw",
    enum: ["Y", "N"],
    default: () => "'N'",
  })
  isWithdraw: "Y" | "N";

  @Column("datetime", { name: "withdraw_dtm", nullable: true })
  withdrawDtm: Date | null;

  @Column("enum", {
    name: "is_marketing",
    enum: ["Y", "N"],
    default: () => "'N'",
  })
  isMarketing: "Y" | "N";

  @Column("datetime", { name: "enable_marketing_At", nullable: true })
  enableMarketingAt: Date | null;

  @Column("datetime", { name: "disable_marketing_At", nullable: true })
  disableMarketingAt: Date | null;

  @OneToMany(() => LoggedIn, (loggedIn) => loggedIn.user)
  loggedIns: LoggedIn[];

  @OneToMany(() => PermissionUser, (permissionUser) => permissionUser.user)
  permissionUsers: PermissionUser[];

  @OneToOne(() => Sites, (sites) => sites.owner)
  sites: Sites;

  @ManyToMany(() => Roles, (roles) => roles.users)
  roles: Roles[];

  @ManyToOne(() => Companies, (companies) => companies.users, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "company_id", referencedColumnName: "id" }])
  company: Companies;

  @ManyToMany(() => Workplace, (workplace) => workplace.users)
  @JoinTable({
    name: "workplace_user",
    joinColumns: [{ name: "user_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "wokrplace_id", referencedColumnName: "id" }],
    schema: "bom",
  })
  workplaces: Workplace[];
}
