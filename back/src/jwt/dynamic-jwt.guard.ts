import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/modules/administration/patients/entities/patient.entity';

@Injectable()
export class DynamicAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const dynamicValue = request.body.password;
    const document = request.body.document;

    if (!dynamicValue || !document) {
      throw new UnauthorizedException('Missing required values');
    }

    const isValid = await this.validateDynamicValue(document, dynamicValue);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password value');
    }

    return true;
  }

  async validateDynamicValue(document: string, password: string): Promise<boolean> {
    try {
      const patient = await this.patientRepository.findOneBy({ document });
      if (!patient) {
        return false;
      }
      
      return patient.password === password;
    } catch (error) {
      throw new UnauthorizedException('Database error');
    }
  }
}