import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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

export class ModalUserComponent implements OnInit {
  form!: UntypedFormGroup;
  passwordForm!: UntypedFormGroup;

  @Input() user: User = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;
  @Input() changePass: boolean = false;
  @Input() roles: Rol[] = [];

  currentPassword: string;
  newPassword: string;
  repetPassword: string;
  changePassSwitch: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly _fileSvc: FileService,
    private readonly _usersSvc: UsersService,
  ) { }

  ngOnInit(): void {
    this.fb();
    this.passForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'user' ] && changes[ 'user' ].currentValue) {
      this.fb();
      this.passForm();
    }
  }

  private fb() {
    return this.form = this.formBuilder.group({
      names: [ this.user.names || null, [ Validators.required, Validators.maxLength(120) ] ],
      avatar: [ this.user.avatar || null, [ Validators.maxLength(255) ] ],
      email: [ this.user.email || null, [ Validators.required, Validators.maxLength(255), Validators.email,  ModalUserComponent.emailValidator ] ],
      password: [ this.user.password || null, [ Validators.maxLength(255) ] ],
      phone: [ this.user.phone || null, [ Validators.required, Validators.maxLength(20) ] ],
      roles_id: [ this.user.roles_id || null, [ Validators.required ] ],
      is_active: [ this.user.is_active !== undefined ? this.user.is_active : true, [ Validators.required ] ],
    });
  }

  private static emailValidator(control: AbstractControl): { [key: string]: any } | null {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailRegexp.test(control.value)) {
      return { 'invalidEmail': true };
    }
    return null;
  }

  private passForm() {
    return this.passwordForm = this.formBuilder.group({
      newPassword: [ null, [ Validators.required ] ],
      repetPassword: [ null, [ Validators.required ] ],
    },
      { validators: this.passwordsMatch });
  }

  getFormData() {
    return this.form.valid ? this.form.value : null;
  }

  public async onBasicUploadAuto(event: any, form: FormGroup) {
    const files = (event && event.files) || [];
    const file = files.length > 0 ? files[ 0 ] : null;

    if (!file) return;
    if (!this._fileSvc.validateFile(file)) return;

    this._fileSvc.uploadFile(file).subscribe((res) => {
      this._fileSvc.setNameFileForm(form, 'avatar', res?.filename);
      const newImage = this._fileSvc.getUrlFile(res.filename);
      this.form.get('avatar').setValue(newImage);
      this.user.avatar = newImage;
    });
  }

  public changePassword() {
    const { id } = this.user;
    const formData = { ...this.passwordForm.value, user_id: id }
    this._usersSvc.changePassword(formData).subscribe(res => { this.passwordForm.reset(); });
  }

  public passwordsMatch(control: AbstractControl): { [ key: string ]: boolean } | null {
    const newPassword = control.get('newPassword')?.value;
    const repetPassword = control.get('repetPassword')?.value;
    if (newPassword !== repetPassword) {
      return { passwordsNotMatch: true };
    }
    return null;
  }
}
