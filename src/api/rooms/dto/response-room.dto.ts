import { OmitType } from '@nestjs/swagger';
import { RoomEntity } from '../entities/room.entity';

export class ResponseRoomDto extends OmitType(RoomEntity, [
  'createdAt',
  'updatedAt',
]) {}
