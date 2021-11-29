import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
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
enum IsMarketing {
  Y,
  N
}
registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(IsMarketing, { name: 'IsMarketing' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column("varchar", { name: "username", length: 15 })
  @Field((type) => String)
  @IsString()
  username: string;

  @Column({select: false, name: "password", nullable: true, length: 255})
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole, nullable: true,})
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

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

  @Column({ type: 'enum', enum: IsMarketing})
  isPasswordExpired: "Y" | "N";

  @Column("varchar", { name: "last_update_ip", nullable: true, length: 255 })
  lastUpdateIp: string | null;

  @Column({ type: 'enum', enum: IsMarketing})
  isEnabled: "Y" | "N";

  @Column("datetime", { name: "created", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column("datetime", {
    name: "last_updated",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUpdated: Date;

  @Column({ type: 'enum', enum: IsMarketing})
  isAccountExpired: "Y" | "N";

  @Column({ type: 'enum', enum: IsMarketing})
  isAccountLocked: "Y" | "N";

  @Column({ type: 'enum', enum: IsMarketing})
  isWithdraw: "Y" | "N";

  @Column("datetime", { name: "withdraw_dtm", nullable: true })
  withdrawDtm: Date | null;

  @Column({ type: 'enum', enum: IsMarketing})
  isMarketing: "Y" | "N";

  @Column("datetime", { name: "enable_marketing_At", nullable: true })
  enableMarketingAt: Date | null;

  @Column("datetime", { name: "disable_marketing_At", nullable: true })
  disableMarketingAt: Date | null;



  @Column({ default: false })
  @Field((type) => Boolean)
  verified: boolean;



  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
