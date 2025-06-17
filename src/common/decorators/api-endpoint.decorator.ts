import { Role } from '../../data/generated/prisma';
import { applyDecorators, CanActivate, Type, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { JwtGuard } from '../../api/auth/guards/jwt.guard';
import { RolesGuard } from '../../api/auth/guards/roles.guard';

type ApiEndpointOptions = {
  summary: string;
  description?: string;
  guards?: Type<CanActivate>[];
  body?: Type<unknown>;
  roles?: Role[];
};

export function ApiEndpoint(options: ApiEndpointOptions): MethodDecorator {
  const decorators: (MethodDecorator | ClassDecorator)[] = [
    ApiOperation({
      summary: options.summary,
      description: options.description,
    }),
  ];

  if (options.guards) {
    decorators.push(UseGuards(...options.guards));

    if (options.guards.includes(JwtGuard)) {
      decorators.push(ApiBearerAuth());
    }
    if (options.guards.includes(RolesGuard) && options.roles) {
      decorators.push(Roles(...options.roles));
    }
  }

  if (options.body) {
    decorators.push(
      ApiBody({
        type: options.body,
      }),
    );
  }

  return applyDecorators(...decorators);
}
