import { Module } from '@nestjs/common';
import { TypesResultsService } from './types-results.service';
import { TypesResultsController } from './types-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesResult } from './entities/types-result.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypesResult]),
  ],
  controllers: [TypesResultsController],
  providers: [TypesResultsService, JwtStrategy],
})
export class TypesResultsModule {}
