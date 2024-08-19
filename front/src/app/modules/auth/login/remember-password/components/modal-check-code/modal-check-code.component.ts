import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';


@Component({
  selector: 'app-modal-check-code',
  templateUrl: './modal-check-code.component.html',
  styleUrl: './modal-check-code.component.scss'
})
export class ModalCheckCodeComponent {
  @Input() email: any;
  code: any;
  loading: boolean;

  constructor(
    private router: Router,
    private readonly authSvc: AuthService,
  ) { }

  public onClickVerifyCode(): void {
    const body = { code: this.code, email: this.email };
    this.loading = true;
    this.authSvc.validateCode(body).pipe(finalize(() => this.loading = false)).subscribe(res => {
      if (res.statusCode === 200) {
        this.authSvc.setUserPassRemember$(body);
        this.router.navigate([ '/', 'auth', 'login', 'recuperar-contrasena', 'crear' ]);
      }
    }, err => { this.loading = false; }, () => { return; });
  }
}
