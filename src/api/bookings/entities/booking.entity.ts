import { Booking } from '../../../data/generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

export class BookingEntity implements Booking {
  @ApiProperty({
    description: 'Booking id',
  })
  id: string;

  @ApiProperty({
    description: 'Room id',
  })
  roomId: string;

  @ApiProperty({
    description: 'User id',
  })
  userId: string;

  @ApiProperty({
    description: 'Booking start time',
  })
  startTime: Date;

  @ApiProperty({
    description: 'Booking end time',
  })
  endTime: Date;

  @ApiProperty({
    description: 'Booking creation datetime',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Booking update datetime',
  })
  updatedAt: Date;
}
