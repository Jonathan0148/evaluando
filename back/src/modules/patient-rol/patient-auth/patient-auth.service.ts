import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/modules/administration/patients/entities/patient.entity';
import { Repository } from 'typeorm';
import { PatientAuthDto } from './dto/patient-auth.dto';

@Injectable()
export class PatientAuthService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>
  ) { }

  async login(patientAuthDto: PatientAuthDto) {
    const { document, password } = patientAuthDto;

    const data = await this.patientRepository.findOneBy({document: document});

    if (!data) {
      throw new NotFoundException('No existe un paciente con el documento ' + document);
    }

    if (data.password !== password) {
      throw new NotFoundException('La contraseña es incorrecta');
    }

    return data;
  }
}