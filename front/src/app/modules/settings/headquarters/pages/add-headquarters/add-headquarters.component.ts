import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Headquarter } from '../../models/headquarter.model';
import { UntypedFormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-headquarters',
  templateUrl: './add-headquarters.component.html',
  styleUrl: './add-headquarters.component.scss'
})
export class AddHeadquartersComponent implements OnChanges {
  form!: UntypedFormGroup;
  @Input() headquarter: Headquarter = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'headquarter' ] && changes[ 'headquarter' ].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: [ this.headquarter.name || null, [ Validators.required, Validators.maxLength(30) ] ],
      address: [ this.headquarter.address || null, [ Validators.required, Validators.maxLength(100) ] ],
      cellphone: [ this.headquarter.cellphone || null, [ Validators.required, Validators.maxLength(20) ] ],
      email: [ this.headquarter.email || null, [ Validators.required, Validators.email, Validators.maxLength(100), AddHeadquartersComponent.emailValidator ] ],
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
