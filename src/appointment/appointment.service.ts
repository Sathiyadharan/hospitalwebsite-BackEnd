// appointment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto, CreateAppointmentsDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto, UpdateAppointmentsDto } from './dto/update-appointment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
 
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async create(createAppointmentsDto: CreateAppointmentsDto) {
    const appointments = [];

    for (const appointmentDto of createAppointmentsDto.data) {
      const appointment = this.appointmentRepository.create({
        name: appointmentDto.name, 
        day: appointmentDto.day,
        session: appointmentDto.session,
        startingtime: appointmentDto.startingtime,
        endingtime: appointmentDto.endingtime,
        doctor: appointmentDto.doctor,
      });

      const savedAppointment = await this.appointmentRepository.save(appointment);
      appointments.push(savedAppointment);
    }
    return appointments;
  }

  async findAll() {
    return await this.appointmentRepository.find();
  }

 



  async findOne(id: number) {
    console.log(`Finding appointment with ID: ${id}`); // Add logging
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async findByDoctor(doctorId: number) {
    return await this.appointmentRepository.find({ where: { doctor: { id: doctorId } }, relations: ['doctor'] });
  }

  
  async updateAppointments(updateAppointmentsDto: UpdateAppointmentsDto): Promise<Appointment[]> {
    console.log('Received DTO:', updateAppointmentsDto); // Add this line to log the DTO
    const updatedAppointments: Appointment[] = [];
    
    for (const updateDto of updateAppointmentsDto.appointments) {
      const updatedAppointment = await this.updateAppointment(updateDto.consultationId, updateDto.doctorId, updateDto);
      updatedAppointments.push(updatedAppointment);
    }
    
    return updatedAppointments;
  }

  private async updateAppointment(consultationId: number, doctorId: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id: consultationId, doctor: { id: doctorId } } });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    
    appointment.startingtime = updateAppointmentDto.startingtime;
    appointment.endingtime = updateAppointmentDto.endingtime;
    
    return this.appointmentRepository.save(appointment);
  }
  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.delete(appointment.id);
  }
}
