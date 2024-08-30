import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PatientExam } from '../../models/patient.model';

@Component({
  selector: 'app-add-exams',
  templateUrl: './add-exams.component.html',
  styleUrl: './add-exams.component.scss'
})
export class AddExamsComponent {
  form!: UntypedFormGroup;
  @Input() patientExam: PatientExam = {};

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'patientExam' ] && changes[ 'patientExam' ].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      internal_code: [ this.patientExam.internal_code || null ],
      date_exam: [ this.patientExam.date_exam || null ],
      date_delivery: [ this.patientExam.date_delivery || null ],
    });
  }
}
