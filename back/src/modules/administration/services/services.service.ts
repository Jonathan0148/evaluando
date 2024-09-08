import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from 'src/dtos-globals/user-login.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { Service } from './entities/service.entity';
import { ImageService } from './entities/image-service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
    @InjectRepository(ImageService) private imageServiceRepository: Repository<ImageService>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<any> {
    const queryBuilder = this.serviceRepository.createQueryBuilder("query")
    .leftJoinAndSelect("query.imageService", "imageService")
      .andWhere(qb => {
        qb.where('(query.name LIKE :term)', {
          term: `%${pageOptionsDto.term}%`
        })
      })
      .orderBy("query.id", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const data = [];
    for (const entity of entities){
      data.push({
        id: entity.id,
        name: entity.name,
        description: entity.description,
        images: entity.imageService.map(image => image.url_image)
      })
    }

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(data, pageMetaDto);
  }

  async findOne(id: number) {
    const data = await this.serviceRepository.createQueryBuilder("query")
      .where("query.id= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe el servicio con el id '+id);

    return data;
  }

  async create(dto: CreateServiceDto, user: UserLoginDto): Promise<Service | any> {
    const data = this.serviceRepository.create({
      name: dto.name,
      description: dto.description,
      created_at: this.formatDate(new Date()),
      created_by: user.userId
    });
    await this.serviceRepository.save(data);

    await this.createImages(dto.images, data.id, user.userId);

    return {message: 'Servicio registrado exitosamente'};
  }

  async createImages(images: string[], serviceId: number, userId: number){
    for (const image of images){
      const data = this.imageServiceRepository.create({
        services_id: serviceId,
        url_image: image,
        created_at: this.formatDate(new Date()),
        created_by: userId
      });

      await this.imageServiceRepository.save(data);
    }
  }

  async update(id:number, dto: CreateServiceDto, user: UserLoginDto): Promise<any> {
    const data = await this.findOne(id);

    if (!data) throw new NotFoundException({message: 'No existe el servicio solicitado'});

    await this.serviceRepository.update(id, {
      name: dto.name,
      description: dto.description,
      updated_at: this.formatDate(new Date()),
      updated_by: user.userId
    });

    await this.imageServiceRepository.delete({services_id: id});
    await this.createImages(dto.images, data.id, user.userId);

    return {message: 'Servicio actualizado exitosamente'};
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.imageServiceRepository.delete({services_id: id});
    await this.serviceRepository.delete(id);

    return {message: 'Servicio eliminado exitosamente'};
  }

  private formatDate(date: Date): string {
    date.setHours(date.getHours() - 5);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}