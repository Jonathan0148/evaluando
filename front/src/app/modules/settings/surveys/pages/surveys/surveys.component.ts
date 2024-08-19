import { Component, OnInit, ViewChild } from '@angular/core';
import { AddSurveysComponent } from '../add-surveys/add-surveys.component';
import { Survey } from '../../models/surveys.model';
import { IParamsIndex, IResponse } from 'src/app/shared/utils';
import { SurveysService } from '../../services/surveys.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { FilterModuleService } from 'src/app/shared/services/filter-module.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrl: './surveys.component.scss'
})
export class SurveysComponent implements OnInit {
  @ViewChild(AddSurveysComponent) addSurveysComponent!: AddSurveysComponent;

  id: number;
  surveyDialog: boolean = false;
  deleteSurveyDialog: boolean = false;
  surveys: Survey[] = [];
  paramsData: IParamsIndex = { take: 10, page: 1 };
  loading: boolean = false;
  survey: Survey = {};
  submitted: boolean = false;
  isDetail: boolean = false;
  canSee: boolean = false;
  canCreate: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;

  constructor(
    private readonly _surveysSvc: SurveysService,
    public readonly router: Router,
    private readonly _filterModuleService: FilterModuleService
  ) { }

  ngOnInit() {
    this.getParamsData();
    this.modulePermissions();
  }

  private getParamsData(): void {
    this.loading = true;
    this._surveysSvc.findAll(this.paramsData).subscribe((response: any) => {
      const { meta } = response;
      this.paramsData.take = meta.itemCount || 1;
      this.getSurveys();
    });
  }

  private getSurveys(): void {
    this._surveysSvc.findAll(this.paramsData).subscribe((response: any) => {
      const { data } = response;
      this.surveys = data;
      data.forEach((element: any) => {
        element.date = this.parseDateWithoutTimezone(element.date);
      });
      this.loading = false;
    });
  }

  private parseDateWithoutTimezone(dateString: string): Date {
    const dateParts = dateString.split('T')[0].split('-');
    return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
  }

  openNew() {
    this.isDetail = false;
    this.survey = {};
    this.submitted = false;
    this.surveyDialog = true;
  }

  onSubmit(survey: Survey) {
    const { id } = survey;
    if (id) return this.update(survey);
    this.create();
    return
  }

  editItem(survey: Survey) {
    this.isDetail = false;
    this.surveyDialog = true;
    this.survey = { ...survey };
  }

  seeItem(survey: Survey) {
    this.isDetail = true;
    this.surveyDialog = true;
    this.survey = { ...survey };
  }

  update(survey: Survey) {
    this.submitted = true;
    if (!this.addSurveysComponent) return;
    const formData = this.addSurveysComponent.getFormData();
    if (!formData) return;
    const updatedFormData: Survey = { ...survey, ...formData };
    this._surveysSvc.update(this.survey.id, updatedFormData).subscribe((data: IResponse) => {
      this.getParamsData();

    });
    this.survey = {};
    this.surveyDialog = false;
  }

  deleteItem(survey: Survey) {
    this.deleteSurveyDialog = true;
    this.survey = { ...survey };
  }

  confirmDelete() {
    this.deleteSurveyDialog = false;
    this._surveysSvc.delete(this.survey.id).subscribe(response => {
      this.getParamsData();
    })
    this.survey = {};
  }

  hideDialog() {
    this.survey = {};
    this.surveyDialog = false;
    this.submitted = false;
  }

  create() {
    this.submitted = true;
    if (!this.addSurveysComponent) return;
    const formData = this.addSurveysComponent.getFormData();
    if (!formData) return;
    this._surveysSvc.create(formData).subscribe((data: IResponse) => {
      this.getParamsData();
    });
    this.survey = {};
    this.surveyDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  modulePermissions() {
    const permissions = this._filterModuleService.modulePermissions('14');

    this.canSee = permissions.canSee;
    this.canCreate = permissions.canCreate;
    this.canEdit = permissions.canEdit;
    this.canDelete = permissions.canDelete;
  }
}
