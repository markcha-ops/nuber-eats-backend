import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Body, Controller, createParamDecorator, Post, UseGuards, Query } from '@nestjs/common';
import { AuthUser } from '../auth/auth-user.decorator';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verify-email.dto';


const MyField = createParamDecorator((data, req) => {
    const result = new LoginInput();
    console.log(req.body);
    
    result.username = String(req.query.username);
    result.password = String(req.query.password);
    return result;
  });

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

//   @Query((returns) => User)
//   @UseGuards(AuthGuard)
//   me(@AuthUser() authUser: User) {
//     return authUser;
//   }
//   @UseGuards(AuthGuard)
//   @Query((returns) => UserProfileOutput)
//   async userProfile(
//     @Args() { userId }: UserProfileInput,
//   ): Promise<UserProfileOutput> {
    
//     const { ok, user } = await this.usersService.findById(userId);
//     return {
//       ok,
//       user,
//     };
//   }

  @Post('create')
  async createAccount(
    @Query() createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    // check new user
    // create user & hash the pasword

    
    try {
      const { ok, error } = await this.usersService.createAccount(
        createAccountInput,
      );
      return {
        ok,
        error,
      };
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  @Post('login')
  async login(@Query() loginInput: LoginInput): Promise<LoginOutput> {
    
    try {
      const { ok, error, token } = await this.usersService.login(loginInput);
      return { ok, error, token };
    } catch (error) {
      return {
        ok: false,
        error,
        token: null,
      };
    }
  }
//   @UseGuards(AuthGuard)
//   @Mutation((returns) => EditProfileOutput)
//   async editProfile(
//     @AuthUser() authUser: User,
//     @Args('input') editProfileInput: EditProfileInput,
//   ): Promise<EditProfileOutput> {
//     try {
//       await this.usersService.editProfile(authUser.id, editProfileInput);
//       return {
//         error: null,
//         ok: true,
//       };
//     } catch (error) {
//       return {
//         ok: false,
//         error,
//       };
//     }
//   }

  @Mutation((returns) => VerifyEmailOutput)
  async verifyEmail(
    @Args('input') verifyEmailInput: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    const {ok, error} = await this.usersService.verifyEmail(verifyEmailInput.code);
    return {ok, error}
  }
}
