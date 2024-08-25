import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { rememberPassModel } from '../models/remember-pass';
import { UserTokenDecode } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.serverUrl;
  authPort: number = environment.portsServices.api;
  userRestorePassObject$ = new BehaviorSubject<rememberPassModel>(null);

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private _cookieSvc: CookieService,
    private router: Router
  ) { }

  public loginAdmin(body: LoginModel): Observable<any> {
    return this.http.post<LoginModel>(`${this.apiUrl}${this.authPort}/api/auth/login`, body);
  }

  public loginPatient(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.authPort}/api/patient-login/login`, body);
  }

  public recoverPass(body: rememberPassModel): Observable<any> {
    return this.http.post<rememberPassModel>(`${this.apiUrl}${this.authPort}/api/auth/recover-pass`, body);
  }

  public restorePass(body: rememberPassModel): Observable<any> {
    return this.http.post<rememberPassModel>(`${this.apiUrl}${this.authPort}/api/auth/restore-pass`, body);
  }

  public validateCode(body: rememberPassModel): Observable<any> {
    return this.http.post<rememberPassModel>(`${this.apiUrl}${this.authPort}/api/auth/validate-code`, body);
  }

  public logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.authPort}/auth/logout`, {});
  }

  public setUserPassRemember$(user: rememberPassModel): void {
    this.userRestorePassObject$.next(user);
  }

  public isAuthenticated(url?: string): boolean {
    const hasSessionActive = this.verifyToken();
    if (!hasSessionActive) {
      (url) ? window.location.href = `${url}/auth/selection` : this.router.navigate([ '/', 'auth', 'selection' ]);
    }
    return hasSessionActive;
  }

  public authenticated(): boolean {
    const hasExpired = this.verifyToken();
    if (hasExpired) this.router.navigate([ '/admin' ]);
    return !hasExpired;
  }

  public verifyToken(): boolean {
    const token = this.getCookie('token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public getUserToken(): UserTokenDecode {
    const token = this.getCookie('token');
    return this.jwtHelper.decodeToken(token);
  }

  public setToken(token: string): void {
    this._cookieSvc.set('token', token, 2, '/');
  }

  public clearCookies(): void {
    if (this._cookieSvc.check('token')) {
      this._cookieSvc.delete('token', '/');
    }
  }

  public getCookie(key: string): string {
    return this._cookieSvc.get(key);
  }
}
