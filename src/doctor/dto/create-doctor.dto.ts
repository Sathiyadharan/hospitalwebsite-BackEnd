export class CreateDoctorDto {
  name: string;
  dob: Date;
  emailId: string;
  password: string;
  address: string;
  phone: string;
  liscenseno:string;
  specialization:string;
  schedules: any;
  photo?: string;

}
