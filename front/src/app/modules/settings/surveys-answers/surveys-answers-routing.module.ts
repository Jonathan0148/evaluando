import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveysAnswersComponent } from './pages/surveys-answers/surveys-answers.component';

const routes: Routes = [ { path: '', component: SurveysAnswersComponent } ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysAnswersRoutingModule { }
