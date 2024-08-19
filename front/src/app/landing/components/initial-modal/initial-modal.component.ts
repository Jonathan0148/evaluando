import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-initial-modal',
  templateUrl: './initial-modal.component.html',
  styleUrl: './initial-modal.component.scss'
})
export class InitialModalComponent {
  @Input() visible: boolean;
}
