import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserRequestEntity } from '../auth/types/user-request.entity';
import { User } from '../../common/decorators/get-user.decorator';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiEndpoint({
    summary: 'Create booking',
  })
  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @ApiEndpoint({
    summary: 'Get all bookings',
    description: 'Only for admins',
    guards: [JwtGuard, RolesGuard],
    roles: ['ADMIN'],
  })
  @Get()
  async getAll() {
    return this.bookingsService.getAll();
  }

  @ApiEndpoint({
    summary: 'Delete booking',
    description:
      'Admins can delete any booking, user can delete only his bookings',
    guards: [JwtGuard],
  })
  @Delete('/:id')
  async delete(@User() user: UserRequestEntity, @Param('id') id: string) {
    return this.bookingsService.delete(id, user);
  }
}
