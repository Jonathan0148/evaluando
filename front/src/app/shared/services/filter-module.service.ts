import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FilterModuleService {

  constructor(private cookieService: CookieService) { }

  public modulePermissions(code: string){
    const token = this.cookieService.get('token');
    const decodedJwt: any = jwtDecode(token);
    const modules = decodedJwt.modules;
    
    return modules.find(m => m.codeModule === code);
  }
}