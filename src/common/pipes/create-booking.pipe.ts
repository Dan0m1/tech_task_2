import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateBookingDto } from '../../api/bookings/dto/create-booking.dto';

@Injectable()
export class CreateBookingPipe
  implements PipeTransform<CreateBookingDto, CreateBookingDto>
{
  transform(value: CreateBookingDto): CreateBookingDto {
    if (value.startTime < value.endTime) {
      return value;
    }
    throw new BadRequestException('Start time must be before end time');
  }
}
