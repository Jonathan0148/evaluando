import { User } from "src/modules/setting/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExamPatient } from "../../exams-patients/entities/exams-patient.entity";
import { ContactUs } from "src/modules/landing/entities/contact-us.entity";

@Entity('headquarters')
export class Headquarters {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    cellphone: string;

    @Column()
    email: string;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;

    @OneToMany(() => User, (user) => user.headquarters)
    user: User[];

    @OneToMany(() => ExamPatient, (examPatient) => examPatient.headquarters)
    examPatient: ExamPatient[];

    @OneToMany(() => ContactUs, (contactUs) => contactUs.headquarters)
    contactUs: ContactUs[];
}