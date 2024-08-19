import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeadquartersDto } from './dto/create-headquarters.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from 'src/dtos-globals/user-login.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { Headquarters } from './entities/headquarters.entity';

@Injectable()
export class HeadquartersService {
  constructor(
    @InjectRepository(Headquarters) private headquartersRepository: Repository<Headquarters>
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Headquarters>> {
    const queryBuilder = this.headquartersRepository.createQueryBuilder("query")
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

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number) {
    const data = await this.headquartersRepository.createQueryBuilder("query")
      .where("query.id= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe la sede con el id '+id);

    return data;
  }

  async create(dto: CreateHeadquartersDto, user: UserLoginDto): Promise<Headquarters | any> {
    const data = this.headquartersRepository.create({
      name: dto.name,
      address: dto.address,
      cellphone: dto.cellphone,
      email: dto.email,
      created_at: this.formatDate(new Date()),
      created_by: user.userId
    });
    await this.headquartersRepository.save(data);

    return {message: 'Sede registrada exitosamente'};
  }

  async update(id:number, dto: CreateHeadquartersDto, user: UserLoginDto): Promise<any> {
    const data = await this.findOne(id);

    if (!data) throw new NotFoundException({message: 'No existe la sede solicitada'});

    await this.headquartersRepository.update(id, {
      name: dto.name,
      address: dto.address,
      cellphone: dto.cellphone,
      email: dto.email,
      updated_at: this.formatDate(new Date()),
      updated_by: user.userId
    });

    return {message: 'Sede actualizada exitosamente'};
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.headquartersRepository.delete(id);

    return {message: 'Sede eliminada exitosamente'};
  }

  private formatDate(date: Date): string {
    date.setHours(date.getHours() - 5);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
}