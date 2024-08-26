import { PartialType } from '@nestjs/swagger';
import { CreateExamsPatientDto } from './create-exams-patient.dto';

export class UpdateExamsPatientDto extends PartialType(CreateExamsPatientDto) {}
