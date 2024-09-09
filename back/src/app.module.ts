import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySqlConfig } from './config/mysql.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeadquartersModule } from './modules/administration/headquarters/headquarters.module';
import { TypesExamsModule } from './modules/administration/types-exams/types-exams.module';
import { TypesResultsModule } from './modules/administration/types-results/types-results.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/setting/users/users.module';
import { RolesModule } from './modules/setting/roles/roles.module';
import { PatientsModule } from './modules/administration/patients/patients.module';
import { ReportsPatientsModule } from './modules/administration/reports-patients/reports-patients.module';
import { ExamsPatientsModule } from './modules/administration/exams-patients/exams-patients.module';
import { FileModule } from './modules/file/file.module';
import { PatientExamModule } from './modules/patient-rol/patient-exam/patient-exam.module';
import { PatientReportModule } from './modules/patient-rol/patient-report/patient-report.module';
import { PatientAuthModule } from './modules/patient-rol/patient-auth/patient-auth.module';
import { ServicesModule } from './modules/administration/services/services.module';
import { LandingModule } from './modules/landing/landing.module';
import { ExamsModule } from './modules/reports/exams/exams.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      MySqlConfig(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD),
    ),
    AuthModule,
    UsersModule,
    RolesModule,
    HeadquartersModule,
    TypesExamsModule,
    TypesResultsModule,
    PatientsModule,
    ReportsPatientsModule,
    ExamsPatientsModule,
    FileModule,
    PatientExamModule,
    PatientReportModule,
    PatientAuthModule,
    ServicesModule,
    LandingModule,
    ExamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}