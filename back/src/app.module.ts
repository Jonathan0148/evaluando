import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySqlConfig } from './config/mysql.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/administration/auth/auth.module';
import { UsersModule } from './modules/administration/users/users.module';
import { RolesModule } from './modules/administration/roles/roles.module';
import { HeadquartersModule } from './modules/administration/headquarters/headquarters.module';
import { TypesExamsModule } from './modules/administration/types-exams/types-exams.module';
import { TypesResultsModule } from './modules/administration/types-results/types-results.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public')
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot( MySqlConfig(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD) ),
    AuthModule,
    UsersModule,
    RolesModule,
    HeadquartersModule,
    TypesExamsModule,
    TypesResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}