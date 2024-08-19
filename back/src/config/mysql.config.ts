import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Headquarters } from "src/modules/administration/headquarters/entities/headquarters.entity";
import { ModuleProject } from "src/modules/administration/roles/entities/module-project.entity";
import { Role } from "src/modules/administration/roles/entities/role.entity";
import { RoleModule } from "src/modules/administration/roles/entities/roles-module.entity";
import { TypesExam } from "src/modules/administration/types-exams/entities/types-exam.entity";
import { TypesResult } from "src/modules/administration/types-results/entities/types-result.entity";
import { User } from "src/modules/administration/users/entities/user.entity";

export const MySqlConfig = (host: string, port:string, database: string, username: string, password: string): 
TypeOrmModuleOptions =>  {
    return {
        type: 'mysql',
        host: host,
        port: parseInt(port),
        username: username,
        password: password,
        database: database,
        entities: [Role, ModuleProject, RoleModule, Headquarters, User, TypesResult, TypesExam],
        synchronize: false,
        logging: false
    }
}