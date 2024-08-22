import { Component, Input, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeResult } from '../../models/type-result.model';

@Component({
  selector: 'app-add-types-results',
  templateUrl: './add-types-results.component.html',
  styleUrl: './add-types-results.component.scss'
})
export class AddTypesResultsComponent {
  form!: UntypedFormGroup;
  @Input() typeResult: TypeResult = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'typeResult' ] && changes[ 'typeResult' ].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      description: [ this.typeResult.description || null, [ Validators.required, Validators.maxLength(255) ] ],
    });
  }

  getFormData() {
    return this.form.valid ? this.form.value : null;
  }
}
