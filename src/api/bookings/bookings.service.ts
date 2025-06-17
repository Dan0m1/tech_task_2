import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { BookingsRepository } from '../../data/repositories/bookings.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from '../../data/generated/prisma';
import { UserRequestEntity } from '../auth/types/user-request.entity';

@Injectable()
export class BookingsService {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  async create(createBookingDto: CreateBookingDto) {
    const { userId, roomId, ...rest } = createBookingDto;

    const booking: Booking | null = await this.bookingsRepository.findOne({
      AND: [
        { startTime: { lt: rest.endTime } },
        { endTime: { gt: rest.startTime } },
      ],
    });

    if (booking) {
      throw new ConflictException('Booking time overlaps with another booking');
    }

    return this.bookingsRepository.create({
      ...rest,
      user: {
        connect: {
          id: userId,
        },
      },
      room: {
        connect: {
          id: roomId,
        },
      },
    });
  }

  async getAll() {
    return this.bookingsRepository.findMany();
  }

  async delete(id: string, initiator: UserRequestEntity) {
    if (initiator.roles.includes('ADMIN')) {
      return this.bookingsRepository.delete({ id });
    }

    const booking = await this.bookingsRepository.findOne({ id });
    if (!booking) {
      throw new BadRequestException('Booking with this id does not exist');
    }
    if (booking.userId !== initiator.id) {
      throw new BadRequestException('You can only delete your own bookings');
    }

    return this.bookingsRepository.delete({ id });
  }
}
