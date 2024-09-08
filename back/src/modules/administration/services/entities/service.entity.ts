import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ImageService } from "./image-service.entity";

@Entity('services')
export class Service {
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

    @OneToMany(() => ImageService, (imageService) => imageService.service)
    imageService: ImageService[];
}