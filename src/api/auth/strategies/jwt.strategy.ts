import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../../../config/security-config.service';
import { JwtPayload } from '../types/jwt-payload';
import { UsersService } from '../../users/users.service';
import { User } from '../../../data/generated/prisma';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly securityConfigService: SecurityConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: securityConfigService.secret,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload) {
      return new ForbiddenException();
    }

    const user: User | null = await this.usersService.getOneById(payload.sub);

    if (!user) {
      return new ForbiddenException();
    }

    return {
      id: payload.sub,
      username: payload.username,
      roles: user.roles,
    };
  }
}
