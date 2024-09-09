import { Controller, Post, HttpCode } from '@nestjs/common';
import { LandingService } from './landing.service';

@Controller('landing')
export class LandingController {
  constructor(private readonly landingService: LandingService) {}

  @Post('/getServices')
  @HttpCode(200)
  async getServices(): Promise<any> {
    return this.landingService.getServices();
  }
}