import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../administration/services/entities/service.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto'
import { ContactUs } from './entities/contact-us.entity';
import { Headquarters } from '../administration/headquarters/entities/headquarters.entity';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';

@Injectable()
export class LandingService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
    @InjectRepository(ContactUs) private contactUsRepository: Repository<ContactUs>,
    @InjectRepository(Headquarters) private headquartersRepository: Repository<Headquarters>,
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

  async getHeadquarters(): Promise<any> {
    const data = await this.headquartersRepository.createQueryBuilder("query")
      .getMany()

    return data;
  }

  async createContact(dto: CreateContactDto): Promise<ContactUs | any> {
    const data = this.contactUsRepository.create({
      headquarters_id: dto.headquarters_id,
      names: dto.names,
      surnames: dto.surnames,
      address: dto.address,
      cellphone: dto.cellphone,
      email: dto.email,
      comments: dto.comments,
      state: 1,
      created_at: this.formatDate(new Date()),
      created_by: 1
    });
    await this.contactUsRepository.save(data);

    return {message: 'Información registrada exitosamente, pronto nos contactaremos con usted'};
  }

  async updateStateCase(caseId: number) {
    const data = await this.contactUsRepository.findOneBy({id: caseId});

    if (!data) throw new NotFoundException({message: 'No existe el caso solicitado'});

    this.contactUsRepository.update({id: caseId}, {
      state: 2
    })

    return {message: 'Caso cerrado exitosamente'};
  }

  async getCasesContact(pageOptionsDto: PageOptionsDto): Promise<any> {
    const queryBuilder = this.contactUsRepository.createQueryBuilder("query")
    .leftJoinAndSelect("query.headquarters", "headquarters")
      .andWhere(qb => {
        qb.where('(query.names LIKE :term)', {
          term: `%${pageOptionsDto.term}%`
        })
      })
      .orderBy("query.state", 'ASC')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
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