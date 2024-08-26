import { Controller, Get, Post, Body, Put, Param, Delete, Request, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, HttpCode, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiPaginatedResponse } from 'src/config/constanst';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(201)
  @Post('/changePassword')
  @UsePipes(new ValidationPipe({whitelist: true}))
  async changePassword(@Body() dto: ChangePasswordDto, @Request() req) {
    return await this.usersService.changePassword(dto, req.user);
  }

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreateUserDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.usersService.findAll(pageOptionsDto,);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateUserDto, @Request() req) {
    return await this.usersService.create(dto, req.user);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto, @Request() req) {
    return await this.usersService.update(id, dto, req.user);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.usersService.remove(id);
  }
}