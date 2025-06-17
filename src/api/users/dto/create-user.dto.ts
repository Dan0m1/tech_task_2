import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsString } from 'class-validator';
import { Prisma, Role } from '../../../data/generated/prisma';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "List of user's roles",
    enum: Role,
    enumName: 'Role',
    isArray: true,
    default: [Role.USER],
  })
  @IsArray()
  @IsEnum(Role)
  roles?: Role[] = [Role.USER];
}
