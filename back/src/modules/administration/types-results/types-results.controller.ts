import { Controller, Get, Post, Body, Put, Param, Delete, Request, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, HttpCode, Query } from '@nestjs/common';
import { TypesResultsService } from './types-results.service';
import { CreateTypesResultDto } from './dto/create-types-result.dto';
import { ApiPaginatedResponse } from 'src/config/constanst';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('types-results')
@UseGuards(JwtAuthGuard)
@Controller('types-results')
export class TypesResultsController {
  constructor(private readonly typesResultsService: TypesResultsService) {}

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreateTypesResultDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<CreateTypesResultDto>> {
    return this.typesResultsService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.typesResultsService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateTypesResultDto, @Request() req) {
    return await this.typesResultsService.create(dto, req.user);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTypesResultDto, @Request() req) {
    return await this.typesResultsService.update(id, dto, req.user);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.typesResultsService.remove(id);
  }
}