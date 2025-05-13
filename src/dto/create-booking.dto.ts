import { IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  flight_uuid: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;
}
