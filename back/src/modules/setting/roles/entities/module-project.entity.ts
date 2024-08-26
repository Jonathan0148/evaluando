import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleModule } from "./roles-module.entity";

@Entity('modules')
export class ModuleProject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

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

    @OneToMany(() => RoleModule, (roleModule) => roleModule.moduleProject)
    roleModule: RoleModule[];
}