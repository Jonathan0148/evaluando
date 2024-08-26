import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportsPatientDto } from './dto/create-reports-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { UserLoginDto } from 'src/dtos-globals/user-login.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { ReportPatient } from './entities/reports-patient.entity';
import { FindAllRPDto } from './dto/find-all-Rp.dto';

@Injectable()
export class ReportsPatientsService {
  constructor(
    @InjectRepository(ReportPatient) private reportPatientRepository: Repository<ReportPatient>
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto, findAllRPDto: FindAllRPDto): Promise<any> {
    const queryBuilder = this.reportPatientRepository.createQueryBuilder("query")
      .leftJoinAndSelect("query.patient", "patient")
      .where(new Brackets(qb => {
        qb.where('(query.name LIKE :term)', {
          term: `%${pageOptionsDto.term}%`
        })
      }))
      .andWhere("query.patient_id= :patient_id", { patient_id: findAllRPDto.patientId })
      .orderBy("query.id", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number) {
    const data = await this.reportPatientRepository.createQueryBuilder("query")
      .where("query.id= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe el reporte del paciente con el id '+id);

    return data;
  }

  async create(dto: CreateReportsPatientDto, user: UserLoginDto): Promise<ReportPatient | any> {
    const data = this.reportPatientRepository.create({
      patient_id: dto.patient_id,
      file_location: dto.file_location,
      name: dto.name,
      created_at: this.formatDate(new Date()),
      created_by: user.userId
    });
    await this.reportPatientRepository.save(data);

    return {message: 'Reporte del paciente registrado exitosamente'};
  }

  async update(id:number, dto: CreateReportsPatientDto, user: UserLoginDto): Promise<any> {
    const data = await this.findOne(id);

    if (!data) throw new NotFoundException({message: 'No existe el reporte del paciente solicitado'});

    await this.reportPatientRepository.update(id, {
      patient_id: dto.patient_id,
      file_location: dto.file_location,
      name: dto.name,
      updated_at: this.formatDate(new Date()),
      updated_by: user.userId
    });

    return {message: 'Reporte del paciente actualizado exitosamente'};
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.reportPatientRepository.delete(id);

    return {message: 'Reporte del paciente eliminado exitosamente'};
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