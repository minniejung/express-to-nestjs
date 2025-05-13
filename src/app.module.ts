import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightController } from './flight/Flight.controller';
import { BookingController } from './book/Booking.controller';
import { AirportController } from './airport/Airport.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    FlightController,
    BookingController,
    AirportController,
  ],
  providers: [AppService],
})
export class AppModule {}
