import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateFlightDto {
  @IsOptional()
  @IsString()
  @Length(3, 3)
  departure?: string;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  destination?: string;

  @IsOptional()
  @IsString()
  departure_times?: string;

  @IsOptional()
  @IsString()
  arrival_times?: string;
}
