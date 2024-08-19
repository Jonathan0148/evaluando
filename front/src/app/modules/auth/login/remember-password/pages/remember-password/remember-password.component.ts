import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-remember-password',
  templateUrl: './remember-password.component.html',
  styleUrl: './remember-password.component.scss'
})
export class RememberPasswordComponent implements OnInit {
  form!: UntypedFormGroup;
  loading!: boolean;
  modalDialog: boolean = false;

  constructor(public layoutService: LayoutService,
    private readonly formBuilder: FormBuilder,
    private readonly authSvc: AuthService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [ null, [ Validators.required, Validators.email ] ],
    })
  }

  public onSubmit(): void {
    this.loading = true;
    this.authSvc.recoverPass(this.form.value).pipe((finalize(() => this.loading = false))).subscribe(res => {
      this.modalDialog = true;
    });
  }

  public isInvalid(name: string): boolean {
    return this.form.controls[ name ].invalid && this.form.controls[ name ].touched;
  }
}
