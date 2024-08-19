import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PersonalTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const personalTokenHeader = request.headers['authorization'];
    
    if (!personalTokenHeader) {
      throw new UnauthorizedException('No se proporcionó un token');
    }

    const personalToken = personalTokenHeader.split(' ')[1]; 

    if (!personalToken) {
      throw new UnauthorizedException('Token no válido');
    }

    const isValid = personalToken === process.env.PERSONAL_TOKEN;

    if (!isValid) {
      throw new UnauthorizedException('Token inválido');
    }

    return true;
  }
}