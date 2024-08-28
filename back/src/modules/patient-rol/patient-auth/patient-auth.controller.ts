import { Controller, Post, Body} from '@nestjs/common';
import { PatientAuthService } from './patient-auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PatientAuthDto } from './dto/patient-auth.dto';

@ApiBearerAuth()
@ApiTags('patient-auth')
@Controller('patient-auth')
export class PatientAuthController {
  constructor(private readonly patientAuthService: PatientAuthService) {}

  @Post()
  login(@Body() patientAuthDto: PatientAuthDto) {
    return this.patientAuthService.login(patientAuthDto);
  }
}