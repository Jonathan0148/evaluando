import { Controller, Post, Body, HttpCode, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { PatientExamService } from './patient-exam.service';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DynamicAuthGuard } from 'src/jwt/dynamic-jwt.guard';
import { PatientAuthDto } from '../patient-auth/dto/patient-auth.dto';

@ApiBearerAuth()
@ApiTags('patient-exam')
@UseGuards(DynamicAuthGuard)
@Controller('patient-exam')
export class PatientExamController {
  constructor(private readonly patientExamService: PatientExamService) {}

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Body() patientAuthDto: PatientAuthDto) {
    return await this.patientExamService.findAll(pageOptionsDto, patientAuthDto);
  }
}