import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}