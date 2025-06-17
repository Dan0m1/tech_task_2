import { Injectable } from '@nestjs/common';
import { RoomsRepository } from '../../data/repositories/rooms.repository';
import { CreateRoomDto } from './dto/create-room.dto';
import { QueryAllAvailableRoomsDto } from './dto/query-all-available-rooms.dto';
import { Room } from '../../data/generated/prisma';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async create(createRoomDto: CreateRoomDto) {
    return this.roomsRepository.create(createRoomDto);
  }

  async queryAllAvailable(query: QueryAllAvailableRoomsDto): Promise<Room[]> {
    return this.roomsRepository.findMany({
      bookings: {
        none: {
          AND: [
            { startTime: { lt: query.endTime } },
            { endTime: { gt: query.startTime } },
          ],
        },
      },
    });
  }
}
