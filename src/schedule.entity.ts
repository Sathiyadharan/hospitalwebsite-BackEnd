import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Doctor } from './doctor/entities/doctor.entity';


@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column()
  time: string;

  @ManyToOne(() => Doctor, doctor => doctor.schedules)
  doctor: Doctor;
}
