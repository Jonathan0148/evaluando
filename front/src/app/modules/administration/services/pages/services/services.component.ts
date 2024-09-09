import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseCrudComponent } from 'src/app/shared/components/base-crud/base-crud.component';
import { ServicesService } from '../../services/services.service';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { FilterModuleService } from 'src/app/shared/services/filter-module.service';
import { Service } from '../../models/service.model';
import { AddServicesComponent } from '../add-services/add-services.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent extends BaseCrudComponent implements OnInit{

  @ViewChild(AddServicesComponent) entityFormComponent: AddServicesComponent;

  override entity: Service;
  override entityService: any;

  services: Service[] = [];

  columns: any[] = [
    { field: 'name', header: 'Nombre', style: 'width: 20%' },
    { field: 'description', header: 'Descripción', style: 'width: 60%' },
  ];

  constructor(
    protected override crudDialogService: CrudService,
    private _filterModuleService: FilterModuleService,
    private _servicesSvc: ServicesService,
    public router: Router
  ) {
    super(crudDialogService);
    this.entityService = _servicesSvc;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.modulePermissions();
  }

  override loadEntities(): void {
    this._servicesSvc.findAll(this.paramsData).subscribe((response: any) => {
      const { data } = response;
      this.services = data;
      this.loading = false;
    });
  }

  modulePermissions() {
    const permissions = this._filterModuleService.modulePermissions('09');
    this.canSee = permissions.canSee;
    this.canCreate = permissions.canCreate;
    this.canEdit = permissions.canEdit;
    this.canDelete = permissions.canDelete;
  }
}
