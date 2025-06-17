import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRequestEntity } from '../../api/auth/types/user-request.entity';

export const User = createParamDecorator(
  (data: keyof UserRequestEntity, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: UserRequestEntity = request.user;

    return data ? user?.[data] : user;
  },
);
