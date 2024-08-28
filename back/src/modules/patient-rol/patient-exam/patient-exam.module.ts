import { Module } from '@nestjs/common';
import { PatientExamService } from './patient-exam.service';
import { PatientExamController } from './patient-exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamPatient } from 'src/modules/administration/exams-patients/entities/exams-patient.entity';
import { PatientsModule } from 'src/modules/administration/patients/patients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamPatient]),
    PatientsModule
  ],
  controllers: [PatientExamController],
  providers: [PatientExamService],
})
export class PatientExamModule {}