import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { doc } from 'prettier';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { Verify } from 'crypto';
import { Verification } from './users/entities/verification.entity';
import { MailModule } from './mail/mail.module';
import { LoggedIn } from './users/entities/LoggedIn';
import { PermissionUser } from './users/entities/PermissionUser';
import { Roles } from './users/entities/Roles';
import { Companies } from './users/entities/Companies';
import { Workplace } from './users/entities/Workplace';
import { Users } from './users/entities/Users';
import { Energy } from './users/entities/Energy';
import { Agent } from 'http';
import { AgentSerialConnector } from './users/entities/AgentSerialConnector';
import { AgentTcpConnector } from './users/entities/AgentTcpConnector';
import { Equipment } from './users/entities/Equipment';
import { EquipSerialConnector } from './users/entities/EquipSerialConnector';
import { FacilityType } from './users/entities/FacilityType';
import { GovernmentProjects } from './users/entities/GovernmentProjects';
import { LocationData } from './users/entities/LocationData';
import { LocationInfo } from './users/entities/LocationInfo';
import { MachbaseTag } from './users/entities/MachbaseTag';
import { Metrics } from './users/entities/Metrics';
import { MetricsVersion } from './users/entities/MetricsVersion';
import { NoderedFunction } from './users/entities/NoderedFunction';
import { Permissions } from './users/entities/Permissions';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ user: req['user'] }),
    }),
    // ConfigModule은 require('./.env')을 대신하여 사용한다.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      // Joi는 환경 변수 파일(.env.dev, .env.test) 등의 여부 나 환경 변수 이름 에 대한 여부를 조사한다.
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PSSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        // https://randomkeygen.com/ -> CodeIgniter Encryption Keys 
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required()
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PSSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod' ? true : false,
      logging: process.env.NODE_ENV !== 'prod' ? true : false,
      entities: [User, Restaurant, Verification],
    }),
    RestaurantsModule,
    UsersModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    MailModule.forRoot({
      apiKey:process.env.MAILGUN_API_KEY,
      fromEmail:process.env.MAILGUN_FROM_EMAIL,
      domain:process.env.MAILGUN_DOMAIN_NAME
    }),
  ],
  controllers: [UsersController],
  providers: [],
})
// export class AppModule {
// 미들 웨어를 원하는 경로 라우팅
export class AppModule  {

}
