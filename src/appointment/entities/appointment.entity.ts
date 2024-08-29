// appointment.entity.ts
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;




  @Column()
  name: string;

  @Column()
  day: string;

  @Column()
  session: string;

  @Column()
  startingtime: string;

  @Column()
  endingtime: string;

  

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

}
