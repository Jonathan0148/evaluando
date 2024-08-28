import { Module } from '@nestjs/common';
import { TypesExamsService } from './types-exams.service';
import { TypesExamsController } from './types-exams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesExam } from './entities/types-exam.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { ExamPatient } from '../exams-patients/entities/exams-patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypesExam, ExamPatient]),
  ],
  controllers: [TypesExamsController],
  providers: [TypesExamsService, JwtStrategy],
})
export class TypesExamsModule {}
