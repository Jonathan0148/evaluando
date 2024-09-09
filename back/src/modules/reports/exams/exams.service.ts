import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamPatient } from 'src/modules/administration/exams-patients/entities/exams-patient.entity';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { GetExamDto } from './dto/get-exam.dto';
import { Brackets, Repository } from 'typeorm';
import { PageDto } from 'src/dtos-globals/page.dto';
import * as moment from 'moment';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { ReportPatient } from 'src/modules/administration/reports-patients/entities/reports-patient.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(ExamPatient) private examPatientRepository: Repository<ExamPatient>,
    @InjectRepository(ReportPatient) private reportPatientRepository: Repository<ReportPatient>
  ) { }

  async exams(pageOptionsDto: PageOptionsDto, getExamDto: GetExamDto): Promise<PageDto<ExamPatient>> {
    const { initDate, endDate } = getExamDto;
  
    const queryBuilder = await this.examPatientRepository.createQueryBuilder("query")
      .leftJoinAndSelect("query.patient", "patient")
      .leftJoinAndSelect("query.headquarters", "headquarters")
      .leftJoinAndSelect("query.typesExam", "typesExam")
      .leftJoinAndSelect("query.typesResult", "typesResult")
      .where(new Brackets(qb => {
        qb.where('(query.internal_code LIKE :term)', {
          term: `%${pageOptionsDto.term}%`
        });
  
        if (initDate && endDate) {
          qb.andWhere('query.date_exam BETWEEN :initDate AND :endDate', {
            initDate: moment(initDate).format('YYYY-MM-DD'),
            endDate: moment(endDate).format('YYYY-MM-DD'),
          });
        }
      }))
      .orderBy("query.id", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
  
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
  
    entities.map((entity) => {
      entity.date_exam = moment.utc(entity.date_exam).format('YYYY-MM-DD');
      entity.date_delivery = moment.utc(entity.date_delivery).format('YYYY-MM-DD');
    });
  
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
  
    return new PageDto(entities, pageMetaDto);
  }  

  async reportsPatient(patientId: number) {
    const data = await this.reportPatientRepository.createQueryBuilder("query")
      .leftJoinAndSelect("query.patient", "patient")
      .where("query.patient_id= :patientId", { patientId })
      .getMany();

    return data;
  }
}