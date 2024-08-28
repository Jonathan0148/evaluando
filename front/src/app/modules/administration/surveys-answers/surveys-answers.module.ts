import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysAnswersRoutingModule } from './surveys-answers-routing.module';
import { SurveysAnswersComponent } from './pages/surveys-answers/surveys-answers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddSurveysAnswersComponent } from './pages/add-surveys-answers/add-surveys-answers.component';


@NgModule({
  declarations: [SurveysAnswersComponent, AddSurveysAnswersComponent],
  imports: [
    CommonModule,
    SurveysAnswersRoutingModule,
    SharedModule
  ]
})
export class SurveysAnswersModule { }
