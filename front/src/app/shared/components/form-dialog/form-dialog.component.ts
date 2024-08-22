import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss'
})
export class FormDialogComponent {
  @Input() visible: boolean = false;
  @Input() header: string = '';
  @Input() width: string = '50%';
  @Input() modal: boolean = true;
  @Input() breakpoints: any = { '1199px': '75vw', '575px': '90vw' };
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;
  @Input() data: any = {};

  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<any>();

  hideDialog() {
    this.onCancel.emit();
  }

  submitForm() {
    this.onSubmit.emit(this.data);
  }
}