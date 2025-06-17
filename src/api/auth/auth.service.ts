import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { TokensDto } from './dto/tokens.dto';
import { UserRequestEntity } from './types/user-request.entity';
import { JwtPayload } from './types/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { RegisterCredentialsDto } from './dto/register-credentials.dto';
import { UsersService } from '../users/users.service';
import { User } from '../../data/generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserRequestEntity> {
    const user = await this.usersService.getOneWithPassword(username);

    if (
      !user ||
      !password ||
      !(await this.validatePassword(password, user.password))
    ) {
      throw new UnauthorizedException('Wrong username or password');
    }

    return {
      id: user.id,
      username: user.username,
      roles: user.roles,
    };
  }

  login(user: UserRequestEntity): TokensDto {
    if (!user) {
      throw new UnauthorizedException();
    }

    const jwtPayload: JwtPayload = {
      sub: user.id,
      username: user.username,
      createdAt: new Date().toISOString(),
    };

    return this.getJwtTokens(jwtPayload);
  }

  async register(
    registerCredentials: RegisterCredentialsDto,
  ): Promise<TokensDto> {
    await Promise.all([
      this.throwIfUsernameIsOccupied(registerCredentials.username),
      this.throwIfEmailIsOccupied(registerCredentials.email),
    ]);

    const { password, ...rest } = registerCredentials;
    const hashPassword = await this.hashPassword(password);

    const newUser: User = await this.usersService.create({
      password: hashPassword,
      ...rest,
    });

    const jwtPayload: JwtPayload = {
      sub: newUser.id,
      username: newUser.username,
      createdAt: new Date().toISOString(),
    };

    return this.getJwtTokens(jwtPayload);
  }

  async throwIfUsernameIsOccupied(username: string): Promise<void> {
    const userByUsername = await this.usersService.getOneByUsername(username);

    if (userByUsername) {
      throw new BadRequestException('Username is already occupied');
    }
  }

  async throwIfEmailIsOccupied(email: string): Promise<void> {
    const userByEmail = await this.usersService.getOneByEmail(email);

    if (userByEmail) {
      throw new BadRequestException('Email is already occupied');
    }
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  getJwtTokens(jwtPayload: JwtPayload): TokensDto {
    return {
      accessToken: this.jwtService.sign(jwtPayload),
      refreshToken: this.jwtService.sign(jwtPayload, {
        expiresIn: process.env.JWT_REFRESH_TTL,
      }),
    };
  }
}
