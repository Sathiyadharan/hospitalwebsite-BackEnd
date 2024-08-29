export class CreatePatientDto {
    name?: string;
    dob?: string;
    emailId?: string;
    password?: string;
    address?: string;
    phone?: string;



}

export class CreatePatientsDto{
    data: CreatePatientDto[];
}
