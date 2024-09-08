import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExamPatient } from "../../exams-patients/entities/exams-patient.entity";

@Entity('services')
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

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