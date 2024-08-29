// appointment.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ValidationPipe, UsePipes } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, CreateAppointmentsDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto, UpdateAppointmentsDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  
  @Post()
  create(@Body() createAppointmentsDto: CreateAppointmentsDto) {
    return this.appointmentService.create(createAppointmentsDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Get('appointments/doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.appointmentService.findByDoctor(+doctorId);
  }

 

 
  @Patch('bulk-update')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateAppointments(@Body() updateAppointmentsDto: UpdateAppointmentsDto) {
    return this.appointmentService.updateAppointments(updateAppointmentsDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
