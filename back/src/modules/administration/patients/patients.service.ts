import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from 'src/dtos-globals/user-login.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { Patient } from './entities/patient.entity';
import * as crypto from 'crypto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Patient>> {
    const queryBuilder = this.patientRepository.createQueryBuilder("query")
      .andWhere(qb => {
        qb.where('(query.names LIKE :term)', {
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
    const data = await this.patientRepository.createQueryBuilder("query")
      .where("query.id= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe el paciente con el id '+id);

    return data;
  }

  async create(dto: CreatePatientDto, user: UserLoginDto): Promise<Patient | any> {
    const password = crypto.randomBytes(4).toString('hex');
    const data = this.patientRepository.create({
      document: dto.document,
      names: dto.names,
      surnames: dto.surnames,
      address: dto.address,
      cellphone: dto.cellphone,
      email: dto.email,
      password: password,
      created_at: this.formatDate(new Date()),
      created_by: user.userId
    });
    await this.patientRepository.save(data);

    return {message: 'Paciente registrado exitosamente'};
  }

  async update(id:number, dto: CreatePatientDto, user: UserLoginDto): Promise<any> {
    const data = await this.findOne(id);

    if (!data) throw new NotFoundException({message: 'No existe el paciente solicitado'});

    await this.patientRepository.update(id, {
      names: dto.names,
      surnames: dto.surnames,
      address: dto.address,
      cellphone: dto.cellphone,
      email: dto.email,
      updated_at: this.formatDate(new Date()),
      updated_by: user.userId
    });

    return {message: 'Paciente actualizado exitosamente'};
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.patientRepository.delete(id);

    return {message: 'Paciente eliminado exitosamente'};
  }

  private formatDate(date: Date): string {
    date.setHours(date.getHours() - 5);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
}