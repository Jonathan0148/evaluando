import { Controller, Post, Body,  UseGuards, HttpCode, UsePipes, ValidationPipe, Query, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { GetExamDto } from './dto/get-exam.dto';

@ApiBearerAuth()
@ApiTags('reports')
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @HttpCode(201)
  @Post('/exams')
  async exams(@Query() pageOptionsDto: PageOptionsDto, @Body() getExamDto: GetExamDto) {
    return await this.examsService.exams(pageOptionsDto, getExamDto);
  }

  @HttpCode(200)
  @Get('/reportsPatient/:patientId')
  async reportsPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return await this.examsService.reportsPatient(patientId);
  }
}