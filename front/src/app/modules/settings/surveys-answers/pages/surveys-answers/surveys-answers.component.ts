import { Component, OnInit } from '@angular/core';
import { IParamsIndex } from 'src/app/shared/utils';
import { Router } from '@angular/router';
import { SurveysAnswer } from '../../models/surveys-answers.model';
import { RestService } from 'src/app/shared/services/rest.service';
import { SurveysAnswersService } from '../../services/surveys-answers.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-surveys-answers',
  templateUrl: './surveys-answers.component.html',
  styleUrl: './surveys-answers.component.scss'
})
export class SurveysAnswersComponent implements OnInit {
  loading: boolean = false;
  surveyAnswer: SurveysAnswer = {};
  surveysAnswers: SurveysAnswer[] = [];
  isDetail: boolean = false;
  surveyAnswerDialog: boolean = false;
  submitted: boolean;

  constructor(
    private readonly _restSvc: RestService,
    private readonly _surveysAnswersService: SurveysAnswersService,
    public readonly router: Router,
  ) { }

  ngOnInit() {
    this._surveysAnswersService.setParams();
    this.getModules();
  }

  private getModules(): void {
    this.loading = true;
    this._restSvc.getUrl('getAnswersSurveys').subscribe((res: any) => {
      this.surveysAnswers = res;
    });
    this.loading = false;

  }

  openNew() {
    this.isDetail = false;
    this.surveyAnswer = {};
    this.surveyAnswerDialog = true;
  }

  seeItem(surveyAnswer: SurveysAnswer) {
    this.isDetail = true;
    this.surveyAnswerDialog = true;
    this.surveyAnswer = { ...surveyAnswer };
  }

  hideDialog() {
    this.surveyAnswer = {};
    this.surveyAnswerDialog = false;
    this.submitted = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
