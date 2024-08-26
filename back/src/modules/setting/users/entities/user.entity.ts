import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { Headquarters } from "src/modules/administration/headquarters/entities/headquarters.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    headquarters_id: number;

    @ManyToOne(() => Headquarters, (headquarters) => headquarters.user)
    @JoinColumn({name: 'headquarters_id'})
    headquarters: Headquarters;

    @Column()
    roles_id: number;

    @ManyToOne(() => Role, (role) => role.user)
    @JoinColumn({name: 'roles_id'})
    role: Role;

    @Column()
    document: string;

    @Column()
    names: string;

    @Column()
    surnames: string;

    @Column()
    user_name: string;

    @Column()
    password: string;

    @Column()
    email?: string;

    @Column()
    active: boolean;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;
} 