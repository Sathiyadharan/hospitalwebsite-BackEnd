import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Controller('patient')
export class PatientController {
  PatientRepository: any;
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CreatePatientDto> {
    return this.patientService.findOne(id);
  }

  @Get(':id')
  async getPatient(@Param('id') id: number) {
      const patient = await this.patientService.getPatientWithDoctorName(id);
      return patient;
  }

  @Get('patients-with-doctors')
  async getAllPatientsWithDoctors(): Promise<Patient[]> {
    return this.patientService.findAllPatientsWithDoctors();
  }

  
   

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
