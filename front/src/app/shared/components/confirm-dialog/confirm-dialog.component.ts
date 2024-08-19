import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  @Input() visible: boolean = false;
  @Input() header: string = 'Confirmar';
  @Input() width: string = '450px';
  @Input() modal: boolean = true;
  @Input() breakpoints: any = { '1199px': '75vw', '575px': '90vw' };
  @Input() message: string = '';

  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  cancel() {
    this.onCancel.emit();
  }

  confirm() {
    this.onConfirm.emit();
  }
}
