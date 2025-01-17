import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => inject(AuthService).authenticated();
