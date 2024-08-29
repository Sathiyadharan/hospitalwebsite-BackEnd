// patient.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';


@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> {
    async findPatientWithDoctorName(patientId: number): Promise<Patient | undefined> {
        return this.createQueryBuilder('patient')
            .leftJoinAndSelect('patient.doctor', 'doctor')
            .where('patient.id = :id', { id: patientId })
            .select(['patient', 'doctor.name'])
            .getOne();
    }
}
