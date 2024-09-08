import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { ImageService } from './entities/image-service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, ImageService]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService, JwtStrategy],
})
export class ServicesModule {}
