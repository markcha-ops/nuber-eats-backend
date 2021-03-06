import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Verification } from './entities/verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification]), ConfigService],
  providers: [UsersResolver, UsersService, UsersController],
  exports: [UsersService],
})
export class UsersModule {}
