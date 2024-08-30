import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

export const patientGuard: CanActivateFn = (route, state) => inject(AuthService).isAuthenticatedPatient();
