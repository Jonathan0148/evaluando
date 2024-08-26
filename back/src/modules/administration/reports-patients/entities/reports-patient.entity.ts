import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "../../patients/entities/patient.entity";

@Entity('reports_patients')
export class ReportPatient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    patient_id: number;

    @ManyToOne(() => Patient, (patient) => patient.reportPatient)
    @JoinColumn({name: 'patient_id'})
    patient: Patient;

    @Column()
    file_location: string;

    @Column()
    name: string;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;
}