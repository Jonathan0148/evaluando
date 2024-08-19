import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { AddSurveysComponent } from './pages/add-surveys/add-surveys.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SurveysComponent, AddSurveysComponent],
  imports: [
    CommonModule,
    SurveysRoutingModule,
    SharedModule
  ]
})
export class SurveysModule { }
