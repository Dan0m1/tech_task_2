import { Room } from '../../../data/generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

export class RoomEntity implements Room {
  @ApiProperty({
    description: 'Room id',
  })
  id: string;

  @ApiProperty({
    description: 'Room name',
  })
  name: string;

  @ApiProperty({
    description: 'Room capacity',
  })
  capacity: number;

  @ApiProperty({
    description: 'Room creation date',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Room update date',
  })
  updatedAt: Date;
}
