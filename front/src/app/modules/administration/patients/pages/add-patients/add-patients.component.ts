import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-add-patients',
  templateUrl: './add-patients.component.html',
  styleUrl: './add-patients.component.scss'
})
export class AddPatientsComponent {
  form!: UntypedFormGroup;
  @Input() patient: Patient = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'patient' ] && changes[ 'patient' ].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      password: [ this.patient.password || null ],
      document: [ this.patient.document || null, [ Validators.required, Validators.maxLength(20) ] ],
      names: [ this.patient.names || null, [ Validators.required, Validators.maxLength(255) ] ],
      surnames: [ this.patient.surnames || null, [ Validators.required, Validators.maxLength(255) ] ],
      address: [ this.patient.address || null, [ Validators.required, Validators.maxLength(255) ] ],
      cellphone: [ this.patient.cellphone || null, [ Validators.required, Validators.maxLength(255) ] ],
      email: [ this.patient.email || null, [ Validators.required, Validators.maxLength(255), Validators.email, AddPatientsComponent.emailValidator ] ],
    });
  }
  
  private static emailValidator(control: AbstractControl): { [ key: string ]: any } | null {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailRegexp.test(control.value)) {
      return { 'invalidEmail': true };
    }
    return null;
  }

  getFormData() {
    return this.form.valid ? this.form.value : null;
  }
}
