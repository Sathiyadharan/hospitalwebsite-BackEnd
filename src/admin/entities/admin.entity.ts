import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
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

   
}
