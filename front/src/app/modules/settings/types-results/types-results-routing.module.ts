import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesResultsComponent } from './pages/types-results/types-results.component';

const routes: Routes = [ { path: '', component: TypesResultsComponent } ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypesResultsRoutingModule { }
