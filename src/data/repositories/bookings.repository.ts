import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '../generated/prisma';

@Injectable()
export class BookingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.BookingCreateInput,
    kwargs?: Partial<Prisma.BookingCreateArgs>,
  ) {
    return this.prisma.booking.create({
      data: data,
      ...kwargs,
    });
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
