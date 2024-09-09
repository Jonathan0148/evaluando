import { Component, Input, SimpleChanges } from '@angular/core';
import { Service } from '../../models/service.model';
import { UntypedFormGroup, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrl: './add-services.component.scss'
})
export class AddServicesComponent {
  form!: UntypedFormGroup;
  @Input() service: Service = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;
  uploadedFiles: any[] = [];

  constructor(
    public readonly _fileSvc: FileService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'service' ] && changes[ 'service' ].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: [ this.service.name || null, [ Validators.required, Validators.maxLength(255) ] ],
      description: [ this.service.description || null, [ Validators.required ] ],
      images: [ this.service.images || null ],
    });
  }

  onUpload(event: any, form: FormGroup) {
    const uploadedFilesNames: string[] = [];
    
    for (let file of event.files) {
      if (!this._fileSvc.validateImageFile(file)) {
        continue;
      }

      this._fileSvc.uploadFile(file).subscribe({
        next: (res) => {
          uploadedFilesNames.push(res.filename);

          if (uploadedFilesNames.length === event.files.length) {
            form.patchValue({ images: uploadedFilesNames });
            this.service.images = uploadedFilesNames;
            form.markAsDirty();
          }
        },
        error: (err) => { console.error(`Error uploading file ${file.name}:`, err); }
      });
    }
  }

  getFormData() {
    return this.form.valid ? this.form.value : null;
  }
}
