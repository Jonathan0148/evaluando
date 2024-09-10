import { Component, Input, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrl: './add-contacts.component.scss'
})
export class AddContactsComponent {
  form!: UntypedFormGroup;
  @Input() message: any = {};

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'message' ] && changes[ 'message' ].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      names: [ this.message?.names || null ],
      surnames: [ this.message?.surnames || null ],
      address: [ this.message?.address || null ],
      cellphone: [ this.message?.cellphone || null ],
      email: [ this.message?.email || null ],
      comments: [ this.message?.comments || null ],
    });
  }
}
