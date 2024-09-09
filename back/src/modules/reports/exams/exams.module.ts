import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { ExamPatient } from 'src/modules/administration/exams-patients/entities/exams-patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportPatient } from 'src/modules/administration/reports-patients/entities/reports-patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamPatient, ReportPatient]),
  ],
  controllers: [ExamsController],
  providers: [ExamsService, JwtStrategy],
})
export class ExamsModule {}
