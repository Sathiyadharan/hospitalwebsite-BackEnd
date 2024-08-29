import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import * as argon2 from 'argon2';


@Injectable()
export class AdminService {
  
  constructor(
  @InjectRepository(Admin)
  private Adminrepository:Repository<Admin>){}


  async create(createAdminDto: CreateAdminDto) {
    const password: string = createAdminDto.password;
    console.log('Original password:', password);

    const hash = await argon2.hash(password);
    console.log('Hashed password:', hash);

    const admin = this.Adminrepository.create({
      name: createAdminDto.name,
      dob: createAdminDto.dob,
      emailId: createAdminDto.emailId,
      password: hash,
      address: createAdminDto.address,
      phone: createAdminDto.phone,
    });

    return await this.Adminrepository.save(admin);
  }


   async findAll() {
     return await this.Adminrepository.find();
  }

 
 async update(id: number, updateAdminDto: UpdateAdminDto) {
  const admin =await this.Adminrepository.findOne({ where: { id: id } });
    if (!Admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

   
    if (updateAdminDto.name) {
      admin.name = updateAdminDto.name;
    }
    if (updateAdminDto.dob) {
      admin.dob = updateAdminDto.dob;
    }
    if (updateAdminDto.emailId) {
      admin.emailId = updateAdminDto.emailId;
    }
    if (updateAdminDto.address) {
      admin.address = updateAdminDto.address;
    }
    if (updateAdminDto.phone) {
      admin.phone = updateAdminDto.phone;
    }

    return await this.Adminrepository.save(admin);
  }


  findOne(id: number) {
    return this.Adminrepository.findOneBy({  id });
  }

  async remove(id: number): Promise<void> {
    const result = await this.Adminrepository.delete(id);
  }
  
}
