import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Body,
  Res,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { booking } from '../../repository/bookingStore';

@Controller('book')
export class BookingController {
  @Get()
  findById(
    @Query('flight_uuid') flight_uuid: string,
    @Query('phone') phone: string,
    @Res() res: Response,
  ) {
    if (flight_uuid) {
      const matches = booking.filter((b) => b.flight_uuid === flight_uuid);
      if (matches.length === 0) {
        throw new NotFoundException(
          'No bookings found for the given flight_uuid',
        );
      }
      return res.status(HttpStatus.OK).json(matches);
    }

    if (phone) {
      const match = booking.find((b) => b.phone === phone);
      if (!match) {
        throw new NotFoundException(
          'No booking found for the given phone number',
        );
      }
      return res.status(HttpStatus.OK).json(match);
    }

    return res.status(HttpStatus.OK).json(booking);
  }

  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Res() res: Response) {
    const { flight_uuid, name, phone } = createBookingDto;

    if (!flight_uuid || !name || !phone) {
      throw new BadRequestException(
        'flight_uuid, name, and phone are required',
      );
    }

    const bookingEntry = { flight_uuid, name, phone };
    booking.push(bookingEntry);

    res.setHeader('Location', `/book?flight_uuid=${flight_uuid}`);
    return res.status(HttpStatus.CREATED).json({ book_id: flight_uuid });
  }

  @Delete()
  deleteById(@Query('phone') phone: string, @Res() res: Response) {
    if (!phone) {
      throw new BadRequestException('Phone number is required');
    }

    const initialLength = booking.length;
    const remaining = booking.filter((b) => b.phone !== phone);

    if (remaining.length === initialLength) {
      throw new NotFoundException('No booking found with that phone number');
    }

    booking.length = 0;
    booking.push(...remaining);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Booking deleted', remaining: booking });
  }
}
