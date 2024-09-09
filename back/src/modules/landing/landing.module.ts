import { Module } from '@nestjs/common';
import { LandingService } from './landing.service';
import { LandingController } from './landing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../administration/services/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
  ],
  controllers: [LandingController],
  providers: [LandingService],
})
export class LandingModule {}
