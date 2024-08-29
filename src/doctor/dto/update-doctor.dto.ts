import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {


    doctor_name?: string;
  doctor_dob?: string; // Ensure this matches your entity type
  doctor_emailId?: string;
  doctor_address?: string;
  doctor_phone?: string; // Changed to string
  password: any;
  name: any;
  dob: any;
  emailId: any;
  address: any;
  phone: any;
}
