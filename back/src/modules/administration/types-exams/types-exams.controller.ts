import { Controller, Get, Post, Body, Put, Param, Delete, Request, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, HttpCode, Query } from '@nestjs/common';
import { TypesExamsService } from './types-exams.service';
import { CreateTypesExamDto } from './dto/create-types-exam.dto';
import { ApiPaginatedResponse } from 'src/config/constanst';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('types-exams')
@UseGuards(JwtAuthGuard)
@Controller('types-exams')
export class TypesExamsController {
  constructor(private readonly typesExamsService: TypesExamsService) {}

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreateTypesExamDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<CreateTypesExamDto>> {
    return this.typesExamsService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.typesExamsService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateTypesExamDto, @Request() req) {
    return await this.typesExamsService.create(dto, req.user);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTypesExamDto, @Request() req) {
    return await this.typesExamsService.update(id, dto, req.user);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.typesExamsService.remove(id);
  }
}