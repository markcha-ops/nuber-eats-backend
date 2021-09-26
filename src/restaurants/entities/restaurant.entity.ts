import {
  Field,
  GraphQLTimestamp,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
  @Field((type) => Number) // GraphQL 객체 선언을 위한 어노테이션
  @PrimaryGeneratedColumn() // 데이터베이스 스키마 설정
  id: number;

  @Field((type) => String) // GraphQL 객체 선언을 위한 어노테이션
  @Column() // 데이터베이스 스키마 설정
  @IsString() // nest의 Dto를 정의하기 위해 사용
  @Length(5, 10) // nest의 Dto를 정의하기 위해 사용
  name: string;

  @Field((type) => Boolean, { nullable: true, defaultValue: true })
  @Column({ default: true })
  @IsOptional() //GraphQL과 데이터베이스 스키마에 default 값이 존재하면 Dto에서 입력을 하지 않아도 괜찮다는 어노테이션
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String)
  @Column()
  @IsString()
  ownerName: string;

  @Field((type) => String)
  @Column()
  @IsString()
  categoryName: string;
}
