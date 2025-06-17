import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../data/repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Booking } from '../../data/generated/prisma';
import { UserRequestEntity } from '../auth/types/user-request.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async getUserBookingsById(id: string, initiator: UserRequestEntity) {
    if (initiator.roles.includes('ADMIN') || initiator.id === id) {
      const result: { bookings: Booking[] } =
        (await this.usersRepository.findOne(
          { id },
          {
            select: {
              bookings: {
                where: {
                  deletedAt: null,
                },
              },
            },
          },
        )) as unknown as { bookings: Booking[] };
      return result?.bookings;
    }
    throw new UnauthorizedException("You can't get other user's bookings");
  }

  async getOneByUsername(username: string) {
    return this.usersRepository.findOne({ username });
  }

  async getOneById(id: string) {
    return this.usersRepository.findOne({ id });
  }

  async getOneByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async getOneWithPassword(username: string) {
    return this.usersRepository.findOne(
      { username },
      {
        select: {
          id: true,
          password: true,
          username: true,
        },
      },
    );
  }
}
