import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  Body,
  NotFoundException,
  // BadRequestException,
} from '@nestjs/common';
import { UpdateFlightDto } from '../dto/update-flight.dto';
import { flights } from '../../repository/flightList';

@Controller('flight')
export class FlightController {
  @Get()
  findAll(
    @Query('departure_times') departure_times: string,
    @Query('arrival_times') arrival_times: string,
    @Query('departure') departure: string,
    @Query('destination') destination: string,
  ) {
    const filtered = flights.filter((flight) => {
      return (
        (!departure_times || flight.departure_times === departure_times) &&
        (!arrival_times || flight.arrival_times === arrival_times) &&
        (!departure || flight.departure === departure) &&
        (!destination || flight.destination === destination)
      );
    });

    return filtered;
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    const flight = flights.find((f) => f.uuid === id);
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }
    return flight;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedFields: UpdateFlightDto) {
    const index = flights.findIndex((f) => f.uuid === id);
    if (index === -1) {
      throw new NotFoundException('Flight not found');
    }

    flights[index] = { ...flights[index], ...updatedFields };
    return flights[index];
  }
}
