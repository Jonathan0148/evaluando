import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesExamsComponent } from './pages/types-exams/types-exams.component';

const routes: Routes = [ { path: '', component: TypesExamsComponent } ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TypesExamsRoutingModule { }
