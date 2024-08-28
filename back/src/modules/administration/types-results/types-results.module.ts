import { Module } from '@nestjs/common';
import { TypesResultsService } from './types-results.service';
import { TypesResultsController } from './types-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesResult } from './entities/types-result.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { ExamPatient } from '../exams-patients/entities/exams-patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypesResult, ExamPatient]),
  ],
  controllers: [TypesResultsController],
  providers: [TypesResultsService, JwtStrategy],
})
export class TypesResultsModule {}
