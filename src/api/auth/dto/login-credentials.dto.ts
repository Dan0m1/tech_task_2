import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginCredentialsDto {
  @ApiProperty({
    description: 'Username',
    name: 'username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password',
    name: 'password',
  })
  @IsString()
  password: string;
}
