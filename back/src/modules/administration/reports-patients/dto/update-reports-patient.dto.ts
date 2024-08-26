import { PartialType } from '@nestjs/swagger';
import { CreateReportsPatientDto } from './create-reports-patient.dto';

export class UpdateReportsPatientDto extends PartialType(CreateReportsPatientDto) {}
