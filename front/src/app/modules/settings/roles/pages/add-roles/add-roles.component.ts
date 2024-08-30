import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, UntypedFormGroup, UntypedFormArray } from '@angular/forms';
import { Module, Rol } from '../../models/rol.model';
import { IParamsIndex } from 'src/app/shared/utils';
import { RestService } from 'src/app/shared/services/rest.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: [ './add-roles.component.scss' ]
})
export class AddRolesComponent implements OnInit {
  form!: UntypedFormGroup;
  @Input() rol: Rol = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;
  modules: Module[] = [];

  paymentOptions = [
    { name: 'Ver', value: 1, constant: true },
    { name: 'Crear', value: 2 },
    { name: 'Editar', value: 3 },
    { name: 'Eliminar', value: 4 },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _restSvc: RestService,
    private _notificationSvc: NotificationService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'rol' ] && changes[ 'rol' ].currentValue) {
      this.loadRoleModules();
    }
  }

  ngOnInit(): void {
    this.getModules();
    this.form = this.formBuilder.group({
      name: [ null, [ Validators.required, Validators.maxLength(50) ] ],
      description: [ null, [ Validators.required, Validators.maxLength(255) ] ],
      rolesModules: this.formBuilder.array([]),
    });
  }

  public loadRoleModules(): void {
    if (!this.rol || !this.rol.rolesModules) return;
    const rolesModulesArr = this.rol.rolesModules.map(rolesModules => ({
      modules_id: rolesModules.modules_id,
      selectedValue: rolesModules.selectedValue || []
    }));
    this.setRolesModulesForm(rolesModulesArr, false);
  }

  private getModules(): void {
    this._restSvc.getUrl('getModules').subscribe((res: any) => {
      this.modules = res;
    });
  }

  get rolesModules(): UntypedFormArray {
    return this.form.controls[ 'rolesModules' ] as UntypedFormArray;
  }

  public addRolesModules(firstLoad: boolean): void {
    const defaultPermission = this.paymentOptions.find(option => option.name === 'Ver');
    const rolesModulesArr = [ { modules_id: null, selectedValue: defaultPermission ? [ defaultPermission ] : [] } ];
    this.setRolesModulesForm(rolesModulesArr, firstLoad);
  }

  public setRolesModulesForm(rolesModulesArr: any, firstLoad: boolean): void {
    if (!firstLoad) {
      this.rolesModules.clear();
    }
    rolesModulesArr.forEach((roleModule: any) => {
      const modules_id = roleModule.modules_id;
      const selectedValue = roleModule.selectedValue;
      const lessonForm = this.formBuilder.group({
        modules_id: [ modules_id ],
        selectedValue: [ selectedValue ]
      });
      this.rolesModules.push(lessonForm);
    });
  }

  public deleteRoleModule(i: number): void {
    if (this.rolesModules.length === 1) return;
    this.rolesModules.removeAt(i);
  }

  getFormData() {
    return this.form.valid ? this.form.value : null;
  }

  public validateExist(id: any, i: number) {
    const modules = this.rolesModules.value;
    const selectedModule = modules[ i ];
    const duplicateIndex = modules.findIndex(
      (item: any, index: number) => index !== i && item.modules_id === selectedModule.modules_id
    );

    if (duplicateIndex !== -1) {
      this._notificationSvc.show('info', 'Ha ocurrido algo...', 'El módulo seleccionado ya se encuentra asignado');
      this.rolesModules.controls[ i ].get('modules_id').setValue(null);
      this.rolesModules.controls[ i ].get('selectedValue').setValue([]);
    } 
  }
}