import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Injectable()
export class PatientService {
  doctorRepository: any;
  findAllPatientsWithDoctors(): Patient[] | PromiseLike<Patient[]> {
    throw new Error('Method not implemented.');
  }
  getPatientWithDoctorName(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Patient)
    private PatientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const password: string = createPatientDto.password;
    console.log('Original password:', password);

    const hash = await argon2.hash(password);
    console.log('Hashed password:', hash);

   
  
    const patient = this.PatientRepository.create({
      name: createPatientDto.name,
      dob: createPatientDto.dob,
      emailId: createPatientDto.emailId,
      password: hash,
      address: createPatientDto.address,
      phone: createPatientDto.phone,
    });
  
    return await this.PatientRepository.save(patient);
  }

  async findAll() {
    return await this.PatientRepository.find();
  }

  



 



  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.PatientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    if (updatePatientDto.name) {
      patient.name = updatePatientDto.name;
    }
    if (updatePatientDto.dob) {
      patient.dob = updatePatientDto.dob;
    }
    if (updatePatientDto.emailId) {
      patient.emailId = updatePatientDto.emailId;
    }
    if (updatePatientDto.address) {
      patient.address = updatePatientDto.address;
    }
    if (updatePatientDto.phone) {
      patient.phone = updatePatientDto.phone;
    }

    return await this.PatientRepository.save(patient);
  }


  async findOne(id: number): Promise<CreatePatientDto> {
    return this.PatientRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const patient = await this.PatientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    await this.PatientRepository.delete(id);
  }
}
