import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserRequestEntity } from '../auth/types/user-request.entity';
import { User } from '../../common/decorators/get-user.decorator';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ResponseBookingDto } from './dto/response-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiEndpoint({
    summary: 'Create booking',
  })
  @ApiCreatedResponse({
    type: ResponseBookingDto,
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
  @ApiOkResponse({
    type: ResponseBookingDto,
    isArray: true,
  })
  @Get()
  async getAll(@Query('includeDeleted') includeDeletedParam: string) {
    let includeDeleted: boolean;
    if (!includeDeletedParam || includeDeletedParam === 'false')
      includeDeleted = false;
    else if (includeDeletedParam === 'true') includeDeleted = true;
    else throw new BadRequestException('Invalid value for includeDeleted');

    return this.bookingsService.getAll(includeDeleted);
  }

  @ApiEndpoint({
    summary: 'Delete booking',
    description:
      'Admins can delete any booking, user can delete only his bookings',
    guards: [JwtGuard],
  })
  @ApiNoContentResponse({
    description: 'Booking deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@User() user: UserRequestEntity, @Param('id') id: string) {
    await this.bookingsService.softDelete(id, user);
  }
}
