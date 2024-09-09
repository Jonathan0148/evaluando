import { Module } from '@nestjs/common';
import { LandingService } from './landing.service';
import { LandingController } from './landing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../administration/services/entities/service.entity';
import { ContactUs } from './entities/contact-us.entity';
import { Headquarters } from '../administration/headquarters/entities/headquarters.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, ContactUs, Headquarters]),
  ],
  controllers: [LandingController],
  providers: [LandingService],
})
export class LandingModule {}
