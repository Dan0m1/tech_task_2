import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Booking, Prisma } from '../generated/prisma';
import { CreateBookingDto } from '../../api/bookings/dto/create-booking.dto';

@Injectable()
export class BookingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createWithCheckTransaction(createBookingDto: CreateBookingDto) {
    const { userId, roomId, ...rest } = createBookingDto;

    return this.prisma.$transaction(
      async (tx) => {
        const booking: Booking | null = await tx.booking.findFirst({
          where: {
            AND: [
              { startTime: { lt: rest.endTime } },
              { endTime: { gt: rest.startTime } },
            ],
          },
        });

        if (booking) {
          throw new Error("There's already a booking in this time slot");
        }

        const newBooking = await tx.booking.create({
          data: {
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
          },
          omit: {
            deletedAt: true,
          },
        });

        return newBooking;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
      },
    );
  }

  async findOne(
    where: Prisma.BookingWhereInput,
    kwargs?: Partial<Prisma.BookingFindFirstArgs>,
  ) {
    return this.prisma.booking.findFirst({
      where: where,
      ...kwargs,
    });
  }

  async findMany(
    where?: Prisma.BookingWhereInput,
    kwargs?: Partial<Prisma.BookingFindManyArgs>,
  ) {
    return this.prisma.booking.findMany({
      where: where,
      ...kwargs,
    });
  }

  async update(
    where: Prisma.BookingWhereUniqueInput,
    data: Prisma.BookingUpdateInput,
    kwargs?: Partial<Prisma.BookingUpdateArgs>,
  ) {
    return this.prisma.booking.update({
      where: where,
      data: data,
      ...kwargs,
    });
  }

  async delete(
    where: Prisma.BookingWhereUniqueInput,
    kwargs?: Partial<Prisma.BookingDeleteArgs>,
  ) {
    return this.prisma.booking.delete({
      where: where,
      ...kwargs,
    });
  }
}
