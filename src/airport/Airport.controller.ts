import { Controller, Get, Query } from '@nestjs/common';
import { airports } from '../../repository/airportList';

@Controller('airport')
export class AirportController {
  @Get()
  findAll(@Query('query') query?: string) {
    if (query !== undefined) {
      const upperQuery = query.toUpperCase();
      const list = airports.filter((item) => item.code.includes(upperQuery));
      return list;
    }
    return airports;
  }
}
