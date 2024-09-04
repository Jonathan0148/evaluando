import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseCrudComponent } from 'src/app/shared/components/base-crud/base-crud.component';
import { AddHeadquartersComponent } from '../add-headquarters/add-headquarters.component';
import { Headquarter } from '../../models/headquarter.model';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { FilterModuleService } from 'src/app/shared/services/filter-module.service';
import { HeadquartersService } from '../../services/headquarters.service';

@Component({
  selector: 'app-headquarters',
  templateUrl: './headquarters.component.html',
  styleUrl: './headquarters.component.scss'
})
export class HeadquartersComponent extends BaseCrudComponent implements OnInit {

  @ViewChild(AddHeadquartersComponent) entityFormComponent: AddHeadquartersComponent;

  override entity: Headquarter;
  override entityService: any;

  dietTypes: Headquarter[] = [];

  columns: any[] = [
    { field: 'name', header: 'Nombre Sede', style: 'width: 20%' },
    { field: 'address', header: 'Dirección', style: 'width: 20%' },
    { field: 'cellphone', header: 'Teléfono', style: 'width: 20%' },
    { field: 'email', header: 'Correo', style: 'width: 20%' },
  ];

  constructor(
    protected override crudDialogService: CrudService,
    private _filterModuleService: FilterModuleService,
    private headquartersSvc: HeadquartersService,
    public router: Router
  ) {
    super(crudDialogService);
    this.entityService = headquartersSvc;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.modulePermissions();
  }

  override loadEntities(): void {
    this.headquartersSvc.findAll(this.paramsData).subscribe((response: any) => {
      const { data } = response;
      this.dietTypes = data;
      this.loading = false;
    });
  }

  modulePermissions() {
    const permissions = this._filterModuleService.modulePermissions('03');
    this.canSee = permissions.canSee;
    this.canCreate = permissions.canCreate;
    this.canEdit = permissions.canEdit;
    this.canDelete = permissions.canDelete;
  }
}
