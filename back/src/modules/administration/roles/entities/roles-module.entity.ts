import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { ModuleProject } from "./module-project.entity";

@Entity('roles_modules')
export class RoleModule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roles_id: number;

    @ManyToOne(() => Role, (role) => role.roleModule)
    @JoinColumn({name: 'roles_id'})
    role: Role;

    @Column()
    modules_id: number;

    @ManyToOne(() => ModuleProject, (moduleProject) => moduleProject.roleModule)
    @JoinColumn({name: 'modules_id'})
    moduleProject: ModuleProject;

    @Column()
    can_see: boolean;

    @Column()
    can_create: boolean;

    @Column()
    can_edit: boolean;

    @Column()
    can_delete: boolean;

    @Column()
    can_export_pdf: boolean;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;
}