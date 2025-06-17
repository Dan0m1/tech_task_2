import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { BookingsRepository } from './repositories/bookings.repository';
import { RoomsRepository } from './repositories/rooms.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    BookingsRepository,
    RoomsRepository,
  ],
  exports: [UsersRepository, BookingsRepository, RoomsRepository],
})
export class DbModule {}
