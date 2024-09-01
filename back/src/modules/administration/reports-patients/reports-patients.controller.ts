import { Controller, Get, Post, Body, Put, Param, Delete, Request, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, HttpCode, Query } from '@nestjs/common';
import { ReportsPatientsService } from './reports-patients.service';
import { CreateReportsPatientDto } from './dto/create-reports-patient.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { FindAllRPDto } from './dto/find-all-rp.dto';

@ApiBearerAuth()
@ApiTags('reports-patients')
@UseGuards(JwtAuthGuard)
@Controller('reports-patients')
export class ReportsPatientsController {
  constructor(private readonly reportsPatientsService: ReportsPatientsService) {}

  @HttpCode(201)
  @Post('/findAll')
  @UsePipes(new ValidationPipe({whitelist: true}))
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Body() findAllRPDto: FindAllRPDto) {
    return await this.reportsPatientsService.findAll(pageOptionsDto, findAllRPDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.reportsPatientsService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateReportsPatientDto, @Request() req) {
    return await this.reportsPatientsService.create(dto, req.user);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateReportsPatientDto, @Request() req) {
    return await this.reportsPatientsService.update(id, dto, req.user);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.reportsPatientsService.remove(id);
  }
}