import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReportPatient } from "../../reports-patients/entities/reports-patient.entity";
import { ExamPatient } from "../../exams-patients/entities/exams-patient.entity";

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    document: string;

    @Column()
    names: string;

    @Column()
    surnames: string;

    @Column()
    address: string;

    @Column()
    cellphone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;

    @OneToMany(() => ReportPatient, (reportPatient) => reportPatient.patient)
    reportPatient: ReportPatient[];

    @OneToMany(() => ExamPatient, (examPatient) => examPatient.patient)
    examPatient: ExamPatient[];
}