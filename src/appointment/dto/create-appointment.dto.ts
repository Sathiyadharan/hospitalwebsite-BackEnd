import { Doctor } from "src/doctor/entities/doctor.entity";

// create-appointment.dto.ts
export class CreateAppointmentDto {

 
    name: string;
    day: string;
    session: string;
    startingtime: string;
    endingtime: string;
    doctor:Doctor;
  }
  
  export class CreateAppointmentsDto {
    data: CreateAppointmentDto[];
  }
  