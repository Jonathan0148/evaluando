import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto, CreateRoleModuleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from 'src/dtos-globals/user-login.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { Role } from './entities/role.entity';
import { ModuleProject } from './entities/module-project.entity';
import { RoleModule } from './entities/roles-module.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(ModuleProject) private moduleRepository: Repository<ModuleProject>,
    @InjectRepository(RoleModule) private roleModuleRepository: Repository<RoleModule>
  ) { }

  async getModules(): Promise<ModuleProject[]> {
    const data = await this.moduleRepository.createQueryBuilder('modules').getMany();

    return data;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Role>> {
    const queryBuilder: any = this.roleRepository.createQueryBuilder("roles")
      .leftJoinAndSelect("roles.roleModule", "roleModule")
      .orderBy("roles.id", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
 
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    let data = [];
    for (const entity of entities) {
        let moduleRoles = [];
        if (entity.roleModule.length) {
            for (const roleM of entity.roleModule) {
                let moduleRole = {
                    modules_id: roleM.modules_id,
                    selectedValue: []
                };

                if (roleM.can_see) {
                    moduleRole.selectedValue.push({
                        name: 'Ver',
                        value: 1
                    });
                }
                if (roleM.can_create) {
                    moduleRole.selectedValue.push({
                        name: 'Crear',
                        value: 2
                    });
                }
                if (roleM.can_edit) {
                    moduleRole.selectedValue.push({
                        name: 'Editar',
                        value: 3
                    });
                }
                if (roleM.can_delete) {
                    moduleRole.selectedValue.push({
                        name: 'Eliminar',
                        value: 4
                    });
                }
                moduleRoles.push(moduleRole);
            }
        }
        entity.rolesModules = moduleRoles;
        data.push(entity);
    }

    return new PageDto(data, pageMetaDto);
  }

  async findOne(id: number) {
    const data = await this.roleRepository.createQueryBuilder("roles")
      .where("roles.id= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe el rol con el id '+id);

    return data;
  }

  async create(dto: CreateRoleDto, user: UserLoginDto): Promise<Role | any> {
    const data = this.roleRepository.create({
      name: dto.name,
      description: dto.description,
      created_at: this.formatDate(new Date()),
      created_by: user.userId
    });
    await this.roleRepository.save(data);

    await this.createModulesForRole(dto.rolesModules, data.id, user);

    return {message: 'Rol registrado correctamente, por favor inicie sesión nuevamente para ver los nuevos cambios'};
  }

  async update(id:number, dto: CreateRoleDto, user: UserLoginDto): Promise<any> {
    const data = await this.findOne(id);

    if (!data) throw new NotFoundException({message: 'No existe el rol solicitado'});

    await this.roleRepository.update(id, {
      name: dto.name,
      description: dto.description,
      updated_at: this.formatDate(new Date()),
      updated_by: user.userId
    });

    await this.roleModuleRepository.delete({roles_id: id});
    await this.createModulesForRole(dto.rolesModules, id, user);

    return {message: 'Rol actualizado correctamente, por favor inicie sesión nuevamente para ver los nuevos cambios'};
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.roleModuleRepository.delete({roles_id: id});
    await this.roleRepository.delete({id});

    return {message: 'Rol eliminado exitosamente'};
  }
  
  private async createModulesForRole(rolesModules: CreateRoleModuleDto[], roleId: number, user: UserLoginDto): Promise<any> {
    for (const role of rolesModules) {
      let roleModule = {
        roles_id: roleId,
        modules_id: role.modules_id,
        can_see: false,
        can_create: false,
        can_edit: false,
        can_delete: false,
        created_at: this.formatDate(new Date()),
        created_by: user.userId
      };
      for (const valueSelect of role.selectedValue) {
        switch (valueSelect.value) {
          case 1:
            roleModule.can_see = true;
            break;
          case 2:
            roleModule.can_create = true;
            break;
          case 3:
            roleModule.can_edit = true;
            break;
          case 4:
            roleModule.can_delete = true;
            break;
        }
      }
      await this.roleModuleRepository.save(roleModule);
    }
  } 

  private formatDate(date: Date): string {
    date.setHours(date.getHours() - 5);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}