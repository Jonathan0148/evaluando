import { Module } from '@nestjs/common';
import { PatientAuthService } from './patient-auth.service';
import { PatientAuthController } from './patient-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/modules/administration/patients/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientAuthController],
  providers: [PatientAuthService],
})
export class PatientAuthModule {}
