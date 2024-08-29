import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Schedule } from 'src/schedule.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dob: Date;

  @Column()
  emailId: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  liscenseno:string;

  @Column()
  phone: string;

  @Column()
  specialization:string;

  @Column({ nullable: true })  
  photo: string;


  @OneToMany(() => Schedule, schedule => schedule.doctor, { cascade: true })
  schedules: Schedule[];

  @OneToMany(()=> Appointment, (x:Appointment)=> x.doctor)
  appointments: Appointment[]


  @OneToMany(() => Patient, patient => patient.doctor) 
  patients: Patient[];


 



  


}
