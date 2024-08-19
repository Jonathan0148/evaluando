import { AfterViewInit, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Patient } from '../../models/patient.model';
import { RestService } from 'src/app/shared/services/rest.service';

@Component({
  selector: 'app-add-patients',
  templateUrl: './add-patients.component.html',
  styleUrl: './add-patients.component.scss'
})
export class AddPatientsComponent implements OnInit, AfterViewInit {
  form!: UntypedFormGroup;
  @Input() patient: Patient = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;
  documentTypes: any;
  autoResize: boolean;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _restSvc: RestService,
  ) { }

  ngAfterViewInit(): void { this.autoResize = true }

  ngOnInit(): void {
    this.initializeForm();
    this.getDocumentTypes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'patient' ] && changes[ 'patient' ].currentValue) {
      this.initializeForm();
    }
  }

  private getDocumentTypes(): void {
    this._restSvc.getUrl('getDocumentTypes').subscribe((res: any) => {
      const { data } = res;
      this.documentTypes = data.map((item: any) => (
        {
          id: item.id,
          name: item.name
        }
      ));
    });
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      document_types_id: [ this.patient.document_types_id || null, [ Validators.required ] ],
      document: [ this.patient.document || null, [ Validators.required, Validators.maxLength(20) ] ],
      names: [ this.patient.names || null, [ Validators.required, Validators.maxLength(255) ] ],
      site: [ this.patient.site || null, [ Validators.required, Validators.maxLength(10) ] ],
      room: [ this.patient.room || null, [ Validators.required, Validators.maxLength(10) ] ],
      floor: [ this.patient.floor || null, [ Validators.required, Validators.maxLength(10) ] ],
      diagnosis_code: [ this.patient.diagnosis_code || null, [ Validators.required, Validators.maxLength(10) ] ],
      diagnosis: [ this.patient.diagnosis || null, [ Validators.required, Validators.maxLength(255) ] ],
      allergies: [ this.patient.allergies || null, [ Validators.required, Validators.maxLength(255) ] ],
      background: [ this.patient.background || null, [ Validators.required, Validators.maxLength(255) ] ],
      birth_date: [ this.patient.birth_date || null, [ Validators.required ] ],
      gender: [ this.patient.gender || null, [ Validators.required, Validators.maxLength(20) ] ],
      diet_type: [ this.patient.diet_type || null, [ Validators.required, Validators.maxLength(255) ] ],
      observations: [ this.patient.observations || null, [ Validators.required, Validators.maxLength(255) ] ],
      preferences: [ this.patient.preferences || null, [ Validators.required, Validators.maxLength(255) ] ],
    });
  }

  getFormData() {
    return this.form.valid ? this.form.value : null;
  }
}
