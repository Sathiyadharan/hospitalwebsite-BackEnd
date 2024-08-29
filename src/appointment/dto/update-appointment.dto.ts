// update-appointment.dto.ts
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAppointmentDto {
  @IsNumber()
  consultationId: number;

  @IsNumber()
  doctorId: number;

  @IsString()
  startingtime: string;

  @IsString()
  endingtime: string;
}

export class UpdateAppointmentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAppointmentDto)
  appointments: UpdateAppointmentDto[];
}
