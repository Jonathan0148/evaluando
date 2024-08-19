import { Component } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Room, Location, Floor } from '../models/guest.model';
// import { RestService } from 'src/app/modules/shared/services/rest.service';
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
      site: [ null, [ Validators.required ] ],
      floor: [ null, [ Validators.required ] ],
      room: [ null, [ Validators.required ] ],
    })
  }

  async onSubmit() {
    this.loading = true;
    this._authSvc.loginPatient(this.form.value).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: async (res) => {
        const { token } = res;
        await this._authSvc.setToken(token);
        this.router.navigate(['/pacientes/calificaciones']);
      },
      error: (err) => {
        // Manejo de errores aquí, si es necesario
        console.error(err);
      }
    });
  }
  

  public isInvalid(name: string): boolean {
    return this.form.controls[ name ].invalid && this.form.controls[ name ].touched;
  }
}
