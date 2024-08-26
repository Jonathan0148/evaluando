import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Headquarters } from "../../headquarters/entities/headquarters.entity";
import { TypesExam } from "../../types-exams/entities/types-exam.entity";
import { TypesResult } from "../../types-results/entities/types-result.entity";
import { Patient } from "../../patients/entities/patient.entity";

@Entity('exams_patients')
export class ExamPatient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    patient_id: number;

    @ManyToOne(() => Patient, (patient) => patient.examPatient)
    @JoinColumn({name: 'patient_id'})
    patient: Patient;

    @Column()
    headquarter_id: number;

    @ManyToOne(() => Headquarters, (headquarters) => headquarters.examPatient)
    @JoinColumn({name: 'headquarter_id'})
    headquarters: Headquarters;

    @Column()
    type_exam_id: number;

    @ManyToOne(() => TypesExam, (typesExam) => typesExam.examPatient)
    @JoinColumn({name: 'type_exam_id'})
    typesExam: TypesExam;

    @Column()
    type_result_id: number;

    @ManyToOne(() => TypesResult, (typesResult) => typesResult.examPatient)
    @JoinColumn({name: 'type_result_id'})
    typesResult: TypesResult;

    @Column()
    internal_code: string;

    @Column()
    date_exam: string;

    @Column()
    date_delivery: string;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;
}