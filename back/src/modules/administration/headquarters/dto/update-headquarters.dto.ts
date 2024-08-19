import { PartialType } from '@nestjs/swagger';
import { CreateHeadquartersDto } from './create-headquarters.dto';

export class UpdateHeadquartersDto extends PartialType(CreateHeadquartersDto) {}
