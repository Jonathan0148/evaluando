import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./service.entity";

@Entity('images_services')
export class ImageService {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    services_id: number;

    @ManyToOne(() => Service, (service) => service.imageService)
    @JoinColumn({name: 'services_id'})
    service: Service;

    @Column()
    url_image: string;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;
}