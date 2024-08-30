import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { PatientAuthDto } from '../patient-auth/dto/patient-auth.dto';
import { ReportPatient } from 'src/modules/administration/reports-patients/entities/reports-patient.entity';

@Injectable()
export class PatientReportService {
  constructor(
    @InjectRepository(ReportPatient) private reportPatientRepository: Repository<ReportPatient>
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto, patientAuthDto: PatientAuthDto): Promise<PageDto<ReportPatient>> {
    const queryBuilder = this.reportPatientRepository.createQueryBuilder("query")
      .leftJoinAndSelect("query.patient", "patient")
      .where(new Brackets(qb => {
        qb.where('(query.name LIKE :term)', {
          term: `%${pageOptionsDto.term}%`
        })
      }))
      .andWhere("patient.document= :document", { document: patientAuthDto.document })
      .orderBy("query.id", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}