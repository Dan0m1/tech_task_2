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
    try {
      return await this.bookingsRepository.createWithCheckTransaction(
        createBookingDto,
      );
    } catch (e) {
      if (e.message === "There's already a booking in this time slot") {
        throw new ConflictException(e.message);
      }
    }
  }

  async getAll(includeDeleted: boolean = false): Promise<Booking[]> {
    return this.bookingsRepository.findMany(
      {
        deletedAt: includeDeleted ? {} : null,
      },
      {
        omit: {
          deletedAt: !includeDeleted,
        },
      },
    );
  }

  async softDelete(id: string, initiator: UserRequestEntity) {
    if (initiator.roles.includes('ADMIN')) {
      return this.bookingsRepository.update(
        { id },
        {
          deletedAt: new Date(),
        },
      );
    }

    const booking = await this.bookingsRepository.findOne({ id });
    if (!booking) {
      throw new BadRequestException('Booking with this id does not exist');
    }
    if (booking.userId !== initiator.id) {
      throw new BadRequestException('You can only delete your own bookings');
    }

    return this.bookingsRepository.update(
      { id },
      {
        deletedAt: new Date(),
      },
    );
  }

  async hardDelete(id: string, initiator: UserRequestEntity) {
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
