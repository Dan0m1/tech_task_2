import { Module } from '@nestjs/common';
import { RoomsModule } from './api/rooms/rooms.module';
import { AuthModule } from './api/auth/auth.module';
import { BookingsModule } from './api/bookings/bookings.module';
import { DbModule } from './data/db.module';
import { CustomConfigModule } from './config/config.module';
import Configuration from './config/config-constansts';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [
    RoomsModule,
    AuthModule,
    BookingsModule,
    UsersModule,
    DbModule,
    CustomConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
