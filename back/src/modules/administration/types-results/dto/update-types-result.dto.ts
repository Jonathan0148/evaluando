import { PartialType } from '@nestjs/swagger';
import { CreateTypesResultDto } from './create-types-result.dto';

export class UpdateTypesResultDto extends PartialType(CreateTypesResultDto) {}
