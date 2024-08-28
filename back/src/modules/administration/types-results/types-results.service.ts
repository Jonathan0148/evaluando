import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypesResultDto } from './dto/create-types-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from 'src/dtos-globals/user-login.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { TypesResult } from './entities/types-result.entity';
import { ExamPatient } from '../exams-patients/entities/exams-patient.entity';

@Injectable()
export class TypesResultsService {
  constructor(
    @InjectRepository(TypesResult) private typesExamRepository: Repository<TypesResult>,
    @InjectRepository(ExamPatient) private examPatientRepository: Repository<ExamPatient>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<TypesResult>> {
    const queryBuilder = this.typesExamRepository.createQueryBuilder("query")
      .andWhere(qb => {
        qb.where('(query.description LIKE :term)', {
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
    const data = await this.typesExamRepository.createQueryBuilder("query")
      .where("query.id= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe el tipo de resultado con el id '+id);

    return data;
  }

  async create(dto: CreateTypesResultDto, user: UserLoginDto): Promise<TypesResult | any> {
    const data = this.typesExamRepository.create({
      description: dto.description,
      created_at: this.formatDate(new Date()),
      created_by: user.userId
    });
    await this.typesExamRepository.save(data);

    return {message: 'Tipo de resultado registrado exitosamente'};
  }

  async update(id:number, dto: CreateTypesResultDto, user: UserLoginDto): Promise<any> {
    const data = await this.findOne(id);

    if (!data) throw new NotFoundException({message: 'No existe el tipo de resultado solicitado'});

    await this.typesExamRepository.update(id, {
      description: dto.description,
      updated_at: this.formatDate(new Date()),
      updated_by: user.userId
    });

    return {message: 'Tipo de resultado actualizado exitosamente'};
  }

  async remove(id: number) {
    await this.findOne(id);

    const dataTE = await this.examPatientRepository.findOneBy({patient_id: id});

    if (dataTE) throw new NotFoundException({message: 'El tipo de resultado no puede ser eliminado porque tiene exámenes relacionados'});

    await this.typesExamRepository.delete(id);

    return {message: 'Tipo de resultado eliminado exitosamente'};
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