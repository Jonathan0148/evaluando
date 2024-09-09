import { Headquarters } from "src/modules/administration/headquarters/entities/headquarters.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('contact_us')
export class ContactUs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    headquarters_id: number;

    @ManyToOne(() => Headquarters, (headquarters) => headquarters.contactUs)
    @JoinColumn({name: 'headquarters_id'})
    headquarters: Headquarters;

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
    comments: string;

    @Column()
    state: number;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;
}