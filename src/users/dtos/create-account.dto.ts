import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from '../../common/dtos/ouput.dto';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'username',
  'password',
  'email'
]) {}
@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
