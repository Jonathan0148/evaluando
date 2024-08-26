import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamsPatientDto } from './dto/create-exams-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from 'src/dtos-globals/user-login.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { ExamPatient } from './entities/exams-patient.entity';
import { FindAllEPDto } from './dto/find-all-ep.dto';

@Injectable()
export class ExamsPatientsService {
  constructor(
    @InjectRepository(ExamPatient) private examPatientRepository: Repository<ExamPatient>
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto, findAllEPDto: FindAllEPDto): Promise<PageDto<ExamPatient>> {
    const queryBuilder = this.examPatientRepository.createQueryBuilder("query")
      .where("query.patient_id= :patient_id", { patient_id: findAllEPDto.patientId })
      .andWhere(qb => {
        qb.where('(query.internal_code LIKE :term)', {
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
    const data = await this.examPatientRepository.createQueryBuilder("query")
      .where("query.id= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe el examen del paciente con el id '+id);

    return data;
  }

  async create(dto: CreateExamsPatientDto, user: UserLoginDto): Promise<ExamPatient | any> {
    const data = this.examPatientRepository.create({
      patient_id: dto.patient_id,
      headquarter_id: dto.headquarter_id,
      type_exam_id: dto.type_exam_id,
      type_result_id: dto.type_result_id,
      internal_code: dto.internal_code,
      date_exam: this.formatDate(new Date(dto.date_exam)),
      date_delivery: this.formatDate(new Date(dto.date_delivery)),
      created_at: this.formatDate(new Date()),
      created_by: user.userId
    });
    await this.examPatientRepository.save(data);

    return {message: 'Examen del paciente registrado exitosamente'};
  }

  async update(id:number, dto: CreateExamsPatientDto, user: UserLoginDto): Promise<any> {
    const data = await this.findOne(id);

    if (!data) throw new NotFoundException({message: 'No existe el examen del paciente solicitado'});

    await this.examPatientRepository.update(id, {
      patient_id: dto.patient_id,
      headquarter_id: dto.headquarter_id,
      type_exam_id: dto.type_exam_id,
      type_result_id: dto.type_result_id,
      internal_code: dto.internal_code,
      date_exam: this.formatDate(new Date(dto.date_exam)),
      date_delivery: this.formatDate(new Date(dto.date_delivery)),
      updated_at: this.formatDate(new Date()),
      updated_by: user.userId
    });

    return {message: 'Examen del paciente actualizado exitosamente'};
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.examPatientRepository.delete(id);

    return {message: 'Examen del paciente eliminado exitosamente'};
  }

  private formatDate(date: Date): string {
    date.setHours(date.getHours() - 5);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
}