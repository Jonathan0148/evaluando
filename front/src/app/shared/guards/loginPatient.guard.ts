import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

export const loginPatientGuard: CanActivateFn = (route, state) => inject(AuthService).authenticatedPatient();
