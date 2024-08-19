import { HttpException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        private jwtService:JwtService
    ) { }

    async findByUserName(user_name: string): Promise<User> {
      return await this.userRepository.createQueryBuilder('user')
        .where("user.user_name = :user_name", { user_name: user_name })
        .getOne();
    }

    async login(userObject: LoginAuthDto) {
      const { userName, password } = userObject;
      const findUser = await this.findByUserName(userName);
      if (!findUser) throw new NotFoundException('No existe un usuario con ese nombre de usuario');
    
      const checkPassword = await compare(password, (await findUser).password);
      if (!checkPassword) throw new HttpException('Contraseña incorrecta', 403);
    
      const { roles_id } = findUser;
      const role = await this.roleRepository.createQueryBuilder("role")
        .leftJoinAndSelect("role.roleModule", "roleModule")
        .leftJoinAndSelect("roleModule.moduleProject", "moduleProject")
        .where({ id: roles_id })
        .getOne();
    
      let dataRoleModule = [];
    
      for (const roleModule of role.roleModule) {
        let moduleData: any = {
          codeModule: roleModule.moduleProject.code,
          canSee: roleModule.can_see,
          canCreate: roleModule.can_create,
          canEdit: roleModule.can_edit,
          canDelete: roleModule.can_delete,
          can_export_pdf: roleModule.can_export_pdf,
        };

        dataRoleModule.push(moduleData);
      }
    
      const payload = { id: findUser.id, names: findUser.names, modules: dataRoleModule };
      const token = this.jwtService.sign(payload);
      const data = {
        name: findUser.names,
        role: role.name,
        token
      };
    
      return data;
    }
}