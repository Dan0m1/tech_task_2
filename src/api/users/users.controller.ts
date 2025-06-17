import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { UserRequestEntity } from '../auth/types/user-request.entity';
import { User } from '../../common/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiEndpoint({
    summary: 'Get user bookings',
    description:
      'Admins can get all bookings of a user, user can get only his bookings',
    guards: [JwtGuard],
  })
  @Get('/:id/bookings')
  async getUserBookings(
    @User() user: UserRequestEntity,
    @Param('id') id: string,
  ) {
    return this.usersService.getUserBookingsById(id, user);
  }
}
