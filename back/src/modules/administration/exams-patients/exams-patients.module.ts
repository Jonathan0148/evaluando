import { Module } from '@nestjs/common';
import { ExamsPatientsService } from './exams-patients.service';
import { ExamsPatientsController } from './exams-patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamPatient } from './entities/exams-patient.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamPatient]),
  ],
  controllers: [ExamsPatientsController],
  providers: [ExamsPatientsService, JwtStrategy],
})
export class ExamsPatientsModule {}
