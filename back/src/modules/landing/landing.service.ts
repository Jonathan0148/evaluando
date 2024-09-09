import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../administration/services/entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LandingService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) { }

  async getServices(): Promise<any> {
    const entities = await this.serviceRepository.createQueryBuilder("query")
      .leftJoinAndSelect("query.imageService", "imageService")
      .getMany()

    const data = [];
    for (const entity of entities){
      data.push({
        id: entity.id,
        name: entity.name,
        description: entity.description,
        images: entity.imageService.map(image => image.url_image)
      })
    }

    return data;
  }
}