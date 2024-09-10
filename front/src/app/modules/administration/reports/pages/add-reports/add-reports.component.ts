import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { RestService } from 'src/app/shared/services/rest.service';

@Component({
  selector: 'app-add-reports',
  templateUrl: './add-reports.component.html',
  styleUrl: './add-reports.component.scss'
})
export class AddReportsComponent {
  form!: UntypedFormGroup;
  @Input() report: any = {};
  reportsPatient: any;

  constructor(
    private readonly _restSvc: RestService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'report' ] && changes[ 'report' ].currentValue) {
      this.initializeForm();
      if (this.report.patient_id) {
        this.getReportsPatient(this.report.patient_id);
      }
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      patient_id: [ this.report.patient_id || null ],
      file_location: [ this.report.file_location || null ],
      name: [ this.report.name || null ],
    });
  }

  getReportsPatient(id: number) {
    this._restSvc.get(id, 'reportsPatient').subscribe((res: any) => {
      this.reportsPatient = res;
    });
  }

  openWindow(url: string): void {
    window.open(url, '_blank');
  }
}
