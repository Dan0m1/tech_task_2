import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    description: 'Room id',
    name: 'room_id',
  })
  @IsString()
  roomId: string;

  @ApiProperty({
    description: 'User id',
    name: 'user_id',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Start time',
    name: 'start_time',
  })
  @IsDate()
  startTime: Date;

  @ApiProperty({
    description: 'End time',
    name: 'end_time',
  })
  @IsDate()
  endTime: Date;
}
