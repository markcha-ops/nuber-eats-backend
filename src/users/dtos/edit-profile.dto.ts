import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from '../../common/dtos/ouput.dto';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['username', 'password']),
) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}
