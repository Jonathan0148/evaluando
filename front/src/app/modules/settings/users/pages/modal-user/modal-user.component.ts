import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Rol } from '../../../roles/models/rol.model';
import { FileService } from 'src/app/shared/services/file.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: [ './modal-user.component.scss' ]
})

export class ModalUserComponent implements OnChanges {
  form!: UntypedFormGroup;
  passwordForm!: UntypedFormGroup;

  @Input() user: User = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() roles: Rol[] = [];
  @Input() headquarters: any[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly _fileSvc: FileService,
    private readonly _usersSvc: UsersService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'user' ] && changes[ 'user' ].currentValue) {
      this.fb();
    }
  }

  private fb() {
    return this.form = this.formBuilder.group({
      headquarters_id: [ this.user.headquarters_id || null, [ Validators.required ] ],
      roles_id: [ this.user.roles_id || null, [ Validators.required ] ],
      names: [ this.user.names || null, [ Validators.required, Validators.maxLength(100) ] ],
      surnames: [ this.user.surnames || null, [ Validators.required, Validators.maxLength(100) ] ],
      user_name: [ this.user.user_name || null, [ Validators.required, Validators.maxLength(50) ] ],
      document: [ this.user.document || null, [ Validators.required, Validators.maxLength(50) ] ],
      email: [ this.user.email || null, [ Validators.required, Validators.maxLength(255), Validators.email, ModalUserComponent.emailValidator ] ],
      password: [ this.user.password || null, [ Validators.maxLength(255) ] ],
      active: [ this.user.active !== undefined ? this.user.active : true, [ Validators.required ] ],
    });
  }

  private static emailValidator(control: AbstractControl): { [ key: string ]: any } | null {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailRegexp.test(control.value)) {
      return { 'invalidEmail': true };
    }
    return null;
  }

  getFormData() {
    return this.form.valid ? this.form.value : null;
  }
}
