import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { RoleModule } from "./roles-module.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

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

    @OneToMany(() => User, (user) => user.role)
    user: User[];

    @OneToMany(() => RoleModule, (roleModule) => roleModule.role)
    roleModule: RoleModule[];
}