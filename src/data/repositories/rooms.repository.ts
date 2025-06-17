import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.RoomCreateInput,
    kwargs?: Partial<Prisma.RoomCreateArgs>,
  ) {
    return this.prisma.room.create({
      data: data,
      ...kwargs,
    });
  }

  async findOne(
    where: Prisma.RoomWhereInput,
    kwargs?: Partial<Prisma.RoomFindFirstArgs>,
  ) {
    return this.prisma.room.findFirst({
      where: where,
      ...kwargs,
    });
  }

  async findMany(
    where: Prisma.RoomWhereInput,
    kwargs?: Partial<Prisma.RoomFindManyArgs>,
  ) {
    return this.prisma.room.findMany({
      where: where,
      ...kwargs,
    });
  }
}
