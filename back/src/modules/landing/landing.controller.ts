import { Controller, Post, HttpCode, UsePipes, ValidationPipe, Body, Get, Put, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { LandingService } from './landing.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('landing')
@Controller('landing')
export class LandingController {
  constructor(private readonly landingService: LandingService) {}

  @Post('/getServices')
  @HttpCode(200)
  async getServices(): Promise<any> {
    return this.landingService.getServices();
  }

  @Get('/getHeadquarters')
  @HttpCode(200)
  async getHeadquarters(): Promise<any> {
    return this.landingService.getHeadquarters();
  }

  @HttpCode(201)
  @Post('/createContact')
  @UsePipes(new ValidationPipe({whitelist: true}))
  async createContact(@Body() dto: CreateContactDto) {
    return await this.landingService.createContact(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put('/updateStateCase/:caseId')
  async updateStateCase(@Param('caseId', ParseIntPipe) caseId: number) {
    return await this.landingService.updateStateCase(caseId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/getCasesContact')
  @HttpCode(200)
  async getCasesContact(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.landingService.getCasesContact(pageOptionsDto);
  }
}