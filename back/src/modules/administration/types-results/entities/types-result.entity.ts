import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExamPatient } from "../../exams-patients/entities/exams-patient.entity";

@Entity('types_results')
export class TypesResult {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;

    @OneToMany(() => ExamPatient, (examPatient) => examPatient.typesExam)
    examPatient: ExamPatient[];
}