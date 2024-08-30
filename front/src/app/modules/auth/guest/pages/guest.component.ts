import { Component } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../../services/auth.service';
import { PatientLoginService } from '../services/patient-login.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { RestService } from 'src/app/shared/services/rest.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})
export class GuestComponent {
  form!: UntypedFormGroup;
  loading!: boolean;

  constructor(
    public layoutService: LayoutService,
    private readonly formBuilder: FormBuilder,
    private readonly _authSvc: AuthService,
    private readonly _patientLoginSvc: PatientLoginService,
    private readonly router: Router,
    private readonly _restSvc: RestService,
  ) { }

  ngOnInit(): void {
    this._patientLoginSvc.setParams();

    this.form = this.formBuilder.group({
      document: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
    })
  }

  async onSubmit() {
    this.loading = true;
    const payload = {
      document: this.form.value.document,
      password: this.form.value.password
    };
  
    this._restSvc.methodPost(payload, '').pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: async (res: any) => {
        const { document, password } = res;
        this._authSvc.setTokenPatient(document, password);
        this.router.navigate(['/auth/guest/patient-exams']);
      },
      error: (err) => {        console.error(err);      }
    });
  }

  public isInvalid(name: string): boolean {
    return this.form.controls[ name ].invalid && this.form.controls[ name ].touched;
  }
}
