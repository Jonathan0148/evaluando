import { Module } from '@nestjs/common';
import { PatientReportService } from './patient-report.service';
import { PatientReportController } from './patient-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamPatient } from 'src/modules/administration/exams-patients/entities/exams-patient.entity';
import { PatientsModule } from 'src/modules/administration/patients/patients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamPatient]),
    PatientsModule
  ],
  controllers: [PatientReportController],
  providers: [PatientReportService],
})
export class PatientReportModule {}
