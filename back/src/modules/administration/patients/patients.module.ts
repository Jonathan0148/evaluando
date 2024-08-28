import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { ExamPatient } from '../exams-patients/entities/exams-patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, ExamPatient]),
  ],
  controllers: [PatientsController],
  providers: [PatientsService, JwtStrategy],
  exports: [TypeOrmModule]
})
export class PatientsModule {}