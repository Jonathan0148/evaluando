import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ModuleProject } from './entities/module-project.entity';
import { RoleModule } from './entities/roles-module.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role, 
      ModuleProject, 
      RoleModule
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService, JwtStrategy],
})
export class RolesModule {}