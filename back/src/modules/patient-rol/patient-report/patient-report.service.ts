import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamPatient } from 'src/modules/administration/exams-patients/entities/exams-patient.entity';
import { Brackets, Repository } from 'typeorm';
import { PageDto } from 'src/dtos-globals/page.dto';
import * as moment from 'moment';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { PatientAuthDto } from '../patient-auth/dto/patient-auth.dto';

@Injectable()
export class PatientReportService {
  constructor(
    @InjectRepository(ExamPatient) private examPatientRepository: Repository<ExamPatient>
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto, patientAuthDto: PatientAuthDto): Promise<PageDto<ExamPatient>> {
    const queryBuilder = this.examPatientRepository.createQueryBuilder("query")
      .leftJoinAndSelect("query.patient", "patient")
      .where(new Brackets(qb => {
        qb.where('(query.internal_code LIKE :term)', {
          term: `%${pageOptionsDto.term}%`
        })
      }))
      .andWhere("patient.document= :document", { document: patientAuthDto.document })
      .orderBy("query.id", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    entities.map((entity) => {
      entity.date_exam = moment(entity.date_exam).format('YYYY-MM-DD');
      entity.date_delivery = moment(entity.date_delivery).format('YYYY-MM-DD');
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}