import { Module } from '@nestjs/common';
import { PatientReportService } from './patient-report.service';
import { PatientReportController } from './patient-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from 'src/modules/administration/patients/patients.module';
import { ReportPatient } from 'src/modules/administration/reports-patients/entities/reports-patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportPatient]),
    PatientsModule
  ],
  controllers: [PatientReportController],
  providers: [PatientReportService],
})
export class PatientReportModule {}
