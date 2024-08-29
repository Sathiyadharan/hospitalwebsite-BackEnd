import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Schedule } from 'src/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor,Schedule])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
