import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeExam } from '../../models/type-exam.model';
import { TypesExamsService } from '../../services/types-exams.service';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { FilterModuleService } from 'src/app/shared/services/filter-module.service';
import { AddTypesExamsComponent } from '../add-types-exams/add-types-exams.component';
import { BaseCrudComponent } from 'src/app/shared/components/base-crud/base-crud.component';

@Component({
  selector: 'app-types-exams',
  templateUrl: './types-exams.component.html',
  styleUrl: './types-exams.component.scss'
})
export class TypesExamsComponent extends BaseCrudComponent implements OnInit {

  @ViewChild(AddTypesExamsComponent) entityFormComponent: AddTypesExamsComponent;

  override entity: TypeExam;
  override entityService: any;

  typeExams: TypeExam[] = [];

  columns: any[] = [
    { field: 'description', header: 'Examen', style: 'width: 100%' },
  ];

  constructor(
    protected override crudDialogService: CrudService,
    private _filterModuleService: FilterModuleService,
    private typesExamsSvc: TypesExamsService,
    public router: Router
  ) {
    super(crudDialogService);
    this.entityService = typesExamsSvc;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.modulePermissions();
  }

  override loadEntities(): void {
    this.typesExamsSvc.findAll(this.paramsData).subscribe((response: any) => {
      const { data } = response;
      this.typeExams = data;
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
