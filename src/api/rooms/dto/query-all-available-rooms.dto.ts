import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryAllAvailableRoomsDto {
  @ApiProperty({
    description: 'Start time to query',
    name: 'start_time',
  })
  @IsDate()
  startTime: Date;

  @ApiProperty({
    description: 'End time to query',
    name: 'end_time',
  })
  @IsDate()
  endTime: Date;
}
