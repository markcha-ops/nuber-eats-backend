import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    username,
    password,
    email,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    // check new user
    // create user & hash the pasword
    try {
      const exists = await this.users.findOne({ username });
      if (exists) {
        return { ok: false, error: 'There is a user with that username already' };
      }
      const user = this.users.create({ username, password, email });
      await this.users.save(user);
      await this.verification.save(
        this.verification.create({
          user,
        }),
      );
      return { ok: true };
    } catch (e) {
      console.log(e);
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({ username, password }: LoginInput): Promise<LoginOutput> {
    // find the user with the username
    // check if the password is correct
    // make a JWT and give it to the user
    try {
      const user = await this.users.findOne(
        { username },
        { select: ['password', 'id'] },
      );
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
          token: null,
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
          token: null,
        };
      }
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Can't log user in.",
        token: null,
      };
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({ id });

      return {
        ok: true,
        user: user,
      };
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  async editProfile(userId: number, { username, password }: EditProfileInput) {
    const user = await this.users.findOne(userId);
    if (username) {
      user.username = username;
      user.verified = false;
      await this.verification.create();
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verifycation = await this.verification.findOne(
        { code },
        { relations: ['user'] }, 
      );
      if (verifycation) {
        verifycation.user.verified = true;
        await this.users.save(verifycation.user);
        await this.verification.delete(verifycation.id);
        return { ok: true, error: null };
      }
      return { ok: false, error: 'Verification not found.' };
    } catch (error) {
      return { ok: false };
    }
  }
}
