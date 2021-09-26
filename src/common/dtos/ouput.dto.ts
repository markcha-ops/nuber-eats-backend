import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutput {
  @Field((type) => String, { nullable: true })
  error?: string; // '?'를 붙인 이유는 해당 리턴 타입이 object를 반환하기 때문이다.

  @Field((type) => Boolean)
  ok: boolean;
}
