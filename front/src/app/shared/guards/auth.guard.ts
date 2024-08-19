import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getCookie('token');
    
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/auth/selection']);
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);

    // Check if the user has the required role
    const expectedRole = route.data['expectedRole'];
    if (expectedRole && decodedToken.role !== expectedRole) {
      this.router.navigate(['/auth/selection']);
      return false;
    }

    return true;
  }
}
