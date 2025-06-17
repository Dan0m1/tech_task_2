import { IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Room name',
    name: 'name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Room capacity',
    name: 'capacity',
    minimum: 1,
  })
  @IsPositive()
  @IsNumber()
  capacity: number;
}
