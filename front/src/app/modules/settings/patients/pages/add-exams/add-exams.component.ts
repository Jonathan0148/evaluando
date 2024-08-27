import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ExamPatient } from '../../models/exam-patient.model';
import { AddPatientsComponent } from '../add-patients/add-patients.component';
import { TypeExam } from '../../../types-exams/models/type-exam.model';
import { TypeResult } from '../../../types-results/models/type-result.model';

@Component({
  selector: 'app-add-exams',
  templateUrl: './add-exams.component.html',
  styleUrl: './add-exams.component.scss'
})
export class AddExamsComponent {
  form!: UntypedFormGroup;
  @Input() patientExam: ExamPatient = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;
  @Input() headquarters: any[] = [];
  @Input() typesExams: TypeExam[] = [];
  @Input() typesResults: TypeResult[] = [];
  @Input() id: number = 0;
  
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
      patient_id: [ this.id || this.patientExam.patient_id ],
      headquarter_id: [ this.patientExam.headquarter_id || null, [ Validators.required, Validators.maxLength(20) ] ],
      type_exam_id: [ this.patientExam.type_exam_id || null, [ Validators.required, Validators.maxLength(255) ] ],
      type_result_id: [ this.patientExam.type_result_id || null, [ Validators.required, Validators.maxLength(255) ] ],
      internal_code: [ this.patientExam.internal_code || null, [ Validators.required, Validators.maxLength(255) ] ],
      date_exam: [ this.patientExam.date_exam || null, [ Validators.required, Validators.maxLength(255) ] ],
      date_delivery: [ this.patientExam.date_delivery || null, [ Validators.required, Validators.maxLength(255), ] ],
    });
  }

  getFormData() {
    return this.form.valid ? this.form.value : null;
  }
}
