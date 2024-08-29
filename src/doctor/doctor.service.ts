import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import * as argon2 from 'argon2';
import { join } from 'path';
import { Multer } from 'multer';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto, file: Multer.File) {
    const password: string = createDoctorDto.password;

    try {
      const hash = await argon2.hash(password);

      let photoPath: string = null;
      if (file) {
        photoPath = join('uploads', 'profileimages', file.filename);
        console.log('Photo uploaded at:', photoPath);
      }

      const doctor = this.doctorRepository.create({
        name: createDoctorDto.name,
        dob: createDoctorDto.dob,
        emailId: createDoctorDto.emailId,
        password: hash,
        address: createDoctorDto.address,
        phone: createDoctorDto.phone,
        liscenseno: createDoctorDto.liscenseno,
        specialization: createDoctorDto.specialization,
        photo: photoPath,
      });

      return await this.doctorRepository.save(doctor);
    } catch (error) {
      console.error('Error creating doctor:', error);
      throw new InternalServerErrorException('Failed to create doctor');
    }
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto, file: Multer.File) {
    const doctor = await this.findOne(id);

    try {
      if (updateDoctorDto.password) {
        doctor.password = await argon2.hash(updateDoctorDto.password);
      }

      if (file) {
        doctor.photo = join('uploads', 'profileimages', file.filename);
        console.log('Photo updated to:', doctor.photo);
      }

      // Update other fields
      if (updateDoctorDto.name) doctor.name = updateDoctorDto.name;
      if (updateDoctorDto.dob) doctor.dob = updateDoctorDto.dob;
      if (updateDoctorDto.emailId) doctor.emailId = updateDoctorDto.emailId;
      if (updateDoctorDto.address) doctor.address = updateDoctorDto.address;
      if (updateDoctorDto.phone) doctor.phone = updateDoctorDto.phone;
      if (updateDoctorDto.liscenseno) doctor.liscenseno = updateDoctorDto.liscenseno;
      if (updateDoctorDto.specialization) doctor.specialization = updateDoctorDto.specialization;

      return await this.doctorRepository.save(doctor);
    } catch (error) {
      console.error('Error updating doctor:', error);
      throw new InternalServerErrorException('Failed to update doctor');
    }
  }

  async findAll() {
    try {
      return await this.doctorRepository.find();
    } catch (error) {
      console.error('Error finding all doctors:', error);
      throw new InternalServerErrorException('Failed to find doctors');
    }
  }

  async findOne(id: number) {
    try {
      const doctor = await this.doctorRepository.findOne({ where: { id } });
      if (!doctor) {
        throw new NotFoundException(`Doctor with ID ${id} not found`);
      }
      return doctor;
    } catch (error) {
      console.error(`Error finding doctor with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to find doctor');
    }
  }

  async remove(id: number) {
    try {
      const doctor = await this.findOne(id);
      await this.doctorRepository.remove(doctor);
    } catch (error) {
      console.error(`Error removing doctor with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to remove doctor');
    }
  }
}
