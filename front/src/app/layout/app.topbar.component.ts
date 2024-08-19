import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../modules/auth/services/auth.service';
import { UserTokenDecode } from '../modules/auth/models/user.model';
 
@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styles: [],
})

export class AppTopBarComponent {

  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;

  user: UserTokenDecode | null = this._authSvc.getUserToken();

  constructor(
    public layoutService: LayoutService,
    private _authSvc: AuthService,
  ) { }

  logout() {
    this._authSvc.clearCookies();
    this._authSvc.isAuthenticated();
  }

}
