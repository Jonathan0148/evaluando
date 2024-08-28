import { Component, Input, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeExam } from '../../models/type-exam.model';

@Component({
  selector: 'app-add-types-exams',
  templateUrl: './add-types-exams.component.html',
  styleUrl: './add-types-exams.component.scss'
})
export class AddTypesExamsComponent {
  form!: UntypedFormGroup;
  @Input() typeExam: TypeExam = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'typeExam' ] && changes[ 'typeExam' ].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      description: [ this.typeExam.description || null, [ Validators.required, Validators.maxLength(255) ] ],
    });
  }

  getFormData() {
    return this.form.valid ? this.form.value : null;
  }
}
