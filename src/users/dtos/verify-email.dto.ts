import { CoreOutput } from '../../common/dtos/ouput.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Verification } from '../entities/verification.entity';

@InputType()
export class VerifyEmailInput extends PickType(Verification, ['code']) {}

@ObjectType()
export class VerifyEmailOutput extends CoreOutput {}
