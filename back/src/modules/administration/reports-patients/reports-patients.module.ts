import { Module } from '@nestjs/common';
import { ReportsPatientsService } from './reports-patients.service';
import { ReportsPatientsController } from './reports-patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportPatient } from './entities/reports-patient.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportPatient]),
  ],
  controllers: [ReportsPatientsController],
  providers: [ReportsPatientsService, JwtStrategy],
})
export class ReportsPatientsModule {}