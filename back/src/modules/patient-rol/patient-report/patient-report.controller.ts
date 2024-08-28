import { Controller, Post, Body, HttpCode, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PatientReportService } from './patient-report.service';
import { DynamicAuthGuard } from 'src/jwt/dynamic-jwt.guard';
import { PatientAuthDto } from '../patient-auth/dto/patient-auth.dto';

@ApiBearerAuth()
@ApiTags('patient-report')
@UseGuards(DynamicAuthGuard)
@Controller('patient-report')
export class PatientReportController {
  constructor(private readonly patientReportService: PatientReportService) {}

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Body() patientAuthDto: PatientAuthDto) {
    return await this.patientReportService.findAll(pageOptionsDto, patientAuthDto);
  }
}