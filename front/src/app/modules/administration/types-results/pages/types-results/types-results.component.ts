import { Component, OnInit, ViewChild } from '@angular/core';
import { AddTypesResultsComponent } from '../add-types-results/add-types-results.component';
import { TypeResult } from '../../models/type-result.model';
import { BaseCrudComponent } from 'src/app/shared/components/base-crud/base-crud.component';
import { TypesResultsService } from '../../services/types-results.service';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { FilterModuleService } from 'src/app/shared/services/filter-module.service';

@Component({
  selector: 'app-types-results',
  templateUrl: './types-results.component.html',
  styleUrl: './types-results.component.scss'
})
export class TypesResultsComponent extends BaseCrudComponent implements OnInit {

  @ViewChild(AddTypesResultsComponent) entityFormComponent: AddTypesResultsComponent;

  override entity: TypeResult;
  override entityService: any;

  typeResults: TypeResult[] = [];

  columns: any[] = [
    { field: 'description', header: 'Resultado', style: 'width: 100%' },
  ];

  constructor(
    protected override crudDialogService: CrudService,
    private _filterModuleService: FilterModuleService,
    private TypesResultsSvc: TypesResultsService,
    public router: Router
  ) {
    super(crudDialogService);
    this.entityService = TypesResultsSvc;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.modulePermissions();
  }

  override loadEntities(): void {
    this.TypesResultsSvc.findAll(this.paramsData).subscribe((response: any) => {
      const { data } = response;
      this.typeResults = data;
      this.loading = false;
    });
  }

  modulePermissions() {
    const permissions = this._filterModuleService.modulePermissions('04');
    this.canSee = permissions.canSee;
    this.canCreate = permissions.canCreate;
    this.canEdit = permissions.canEdit;
    this.canDelete = permissions.canDelete;
  }
}
