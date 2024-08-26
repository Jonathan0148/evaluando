import { Controller, Get, Post, Body, Put, Param, Delete, Request, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, HttpCode, Query } from '@nestjs/common';
import { ExamsPatientsService } from './exams-patients.service';
import { CreateExamsPatientDto } from './dto/create-exams-patient.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { FindAllEPDto } from './dto/find-all-ep.dto';

@ApiBearerAuth()
@ApiTags('exams-patients')
@UseGuards(JwtAuthGuard)
@Controller('exams-patients')
export class ExamsPatientsController {
  constructor(private readonly examsPatientsService: ExamsPatientsService) {}

  @HttpCode(201)
  @Post('/findAll')
  @UsePipes(new ValidationPipe({whitelist: true}))
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Body() findAllEPDto: FindAllEPDto) {
    return await this.examsPatientsService.findAll(pageOptionsDto, findAllEPDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.examsPatientsService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateExamsPatientDto, @Request() req) {
    return await this.examsPatientsService.create(dto, req.user);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateExamsPatientDto, @Request() req) {
    return await this.examsPatientsService.update(id, dto, req.user);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.examsPatientsService.remove(id);
  }
}