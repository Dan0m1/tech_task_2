import { Prisma } from '../generated/prisma';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.UserCreateInput,
    kwargs?: Partial<Prisma.UserCreateArgs>,
  ) {
    return this.prisma.user.create({
      data: data,
      ...kwargs,
    });
  }

  async findOne(
    where: Prisma.UserWhereInput,
    kwargs?: Partial<Prisma.UserFindFirstArgs>,
  ) {
    return this.prisma.user.findFirst({
      where: where,
      ...kwargs,
    });
  }
}
