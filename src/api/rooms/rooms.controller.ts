import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { QueryAllAvailableRoomsDto } from './dto/query-all-available-rooms.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseRoomDto } from './dto/response-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiEndpoint({
    summary: 'Create room',
    description: 'Only for admins',
    guards: [JwtGuard, RolesGuard],
    roles: ['ADMIN'],
  })
  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @ApiEndpoint({
    summary: 'Get available rooms',
  })
  @ApiOkResponse({
    type: ResponseRoomDto,
    isArray: true,
  })
  @Get('available')
  async getAvailable(
    @Query() queryAllAvailableRoomsDto: QueryAllAvailableRoomsDto,
  ) {
    return this.roomsService.queryAllAvailable(queryAllAvailableRoomsDto);
  }
}
