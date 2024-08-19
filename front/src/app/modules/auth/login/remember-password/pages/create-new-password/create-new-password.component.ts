import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrl: './create-new-password.component.scss'
})

export class CreateNewPasswordComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading!: boolean;
  email!: string;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authSvc: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.form = this.formBuilder.group({
      newPassword: [ null, [ Validators.required, Validators.maxLength(32), Validators.minLength(5) ] ],
      passwordConfirmation: [ null, [ Validators.required, Validators.maxLength(32), Validators.minLength(5) ] ],
    }, { validators: this.passwordsMatch });
  }

  public passwordsMatch(control: AbstractControl): { [ key: string ]: boolean } | null {
    const newPassword = control.get('newPassword')?.value;
    const passwordConfirmation = control.get('passwordConfirmation')?.value;
    if (newPassword !== passwordConfirmation) {
      return { passwordsNotMatch: true };
    }
    return null;
  }

  public onSubmit(): void {
    this.loading = true;
    let body = { ...this.form.value, email: this.email }
    this.authSvc.restorePass(body).pipe((finalize(() => this.loading = false))).subscribe(res => {
      this.navigateLogin();
    })
  }

  private getUserData(): void {
    this.authSvc.userRestorePassObject$.subscribe((res) => {
      if (!res) { this.navigateLogin(); return }
      const { email, code } = res;
      this.email = email;
    });
  }

  private navigateLogin = () => this.router.navigate([ '/', 'auth', 'login' ])

  ngOnDestroy(): void {
    this.authSvc.userRestorePassObject$.unsubscribe();
  }
}
