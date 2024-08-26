import { Controller, Get, Post, Body, Put, Param, Delete, Request, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, HttpCode, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { ApiPaginatedResponse } from 'src/config/constanst';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('patients')
@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreatePatientDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<CreatePatientDto>> {
    return this.patientsService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.patientsService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreatePatientDto, @Request() req) {
    return await this.patientsService.create(dto, req.user);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreatePatientDto, @Request() req) {
    return await this.patientsService.update(id, dto, req.user);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.patientsService.remove(id);
  }
}