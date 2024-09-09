import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ExamPatient } from "src/modules/administration/exams-patients/entities/exams-patient.entity";
import { Headquarters } from "src/modules/administration/headquarters/entities/headquarters.entity";
import { Patient } from "src/modules/administration/patients/entities/patient.entity";
import { ReportPatient } from "src/modules/administration/reports-patients/entities/reports-patient.entity";
import { ImageService } from "src/modules/administration/services/entities/image-service.entity";
import { Service } from "src/modules/administration/services/entities/service.entity";
import { TypesExam } from "src/modules/administration/types-exams/entities/types-exam.entity";
import { TypesResult } from "src/modules/administration/types-results/entities/types-result.entity";
import { ContactUs } from "src/modules/landing/entities/contact-us.entity";
import { ModuleProject } from "src/modules/setting/roles/entities/module-project.entity";
import { Role } from "src/modules/setting/roles/entities/role.entity";
import { RoleModule } from "src/modules/setting/roles/entities/roles-module.entity";
import { User } from "src/modules/setting/users/entities/user.entity";

export const MySqlConfig = (host: string, port:string, database: string, username: string, password: string): 
TypeOrmModuleOptions =>  {
    return {
        type: 'mysql',
        host: host,
        port: parseInt(port),
        username: username,
        password: password,
        database: database,
        entities: [Role, ModuleProject, RoleModule, Headquarters, User, TypesResult, TypesExam, Patient, ReportPatient, ExamPatient, Service, ImageService, ContactUs],
        synchronize: false,
        logging: false
    }
}