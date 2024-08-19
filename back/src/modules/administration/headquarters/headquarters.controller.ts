import { Controller, Get, Post, Body, Put, Param, Delete, Request, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, HttpCode, Query } from '@nestjs/common';
import { HeadquartersService } from './headquarters.service';
import { CreateHeadquartersDto } from './dto/create-headquarters.dto';
import { ApiPaginatedResponse } from 'src/config/constanst';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('headquarters')
@UseGuards(JwtAuthGuard)
@Controller('headquarters')
export class HeadquartersController {
  constructor(private readonly headquartersService: HeadquartersService) {}

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreateHeadquartersDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<CreateHeadquartersDto>> {
    return this.headquartersService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.headquartersService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateHeadquartersDto, @Request() req) {
    return await this.headquartersService.create(dto, req.user);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateHeadquartersDto, @Request() req) {
    return await this.headquartersService.update(id, dto, req.user);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.headquartersService.remove(id);
  }
}