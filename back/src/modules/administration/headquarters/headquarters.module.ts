import { Module } from '@nestjs/common';
import { HeadquartersService } from './headquarters.service';
import { HeadquartersController } from './headquarters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Headquarters } from './entities/headquarters.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Headquarters]),
  ],
  controllers: [HeadquartersController],
  providers: [HeadquartersService, JwtStrategy],
})
export class HeadquartersModule { }
