import { Doctor } from "src/doctor/entities/doctor.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;

    @Column()
    dob:string;

    @Column()
    emailId:string;
     
    @Column()
    password:string;

    @Column()
    address:string;

    @Column()
    phone:string;


    @ManyToOne(() => Doctor, doctor => doctor.patients) 
       doctor: Doctor;

    

  

   
}


