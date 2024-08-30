import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/modules/administration/patients/models/patient.model';
import { ReportPatient } from 'src/app/modules/administration/patients/models/report-patient.model';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-add-reports',
  templateUrl: './add-reports.component.html',
  styleUrl: './add-reports.component.scss'
})
export class AddReportsComponent {
  form!: UntypedFormGroup;
  @Input() patientReport: ReportPatient = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;
  @Input() patients: Patient[] = [];
  @Input() id: number = 0;

  constructor(
    public readonly _fileSvc: FileService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'patientReport' ] && changes[ 'patientReport' ].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      patient_id: [ this.id || this.patientReport.patient_id ],
      file_location: [ this.patientReport.file_location || null, [ Validators.required, Validators.maxLength(255) ] ],
      name: [ this.patientReport.name || null, [ Validators.required, Validators.maxLength(255) ] ],
    });
  }

  public async onBasicUploadAuto(event: any, form: FormGroup) {
    const files = (event && event.files) || [];
    const file = files.length > 0 ? files[ 0 ] : null;

    if (!file) return;
    if (!this._fileSvc.validateFile(file)) return;

    this._fileSvc.uploadFile(file).subscribe((res) => {
      const newImage = this._fileSvc.getUrlFile(res.filename);
      this.form.get('file_location').setValue(newImage);
      this.patientReport.file_location = newImage;
    });
  }

  openWindow(url: string): void {
    window.open(url, '_blank');
  }

  getFormData() {
    return this.form.valid ? this.form.value : null;
  }
}
