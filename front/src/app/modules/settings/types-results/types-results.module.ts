import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypesResultsRoutingModule } from './types-results-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TypesResultsComponent } from './pages/types-results/types-results.component';
import { AddTypesResultsComponent } from './pages/add-types-results/add-types-results.component';


@NgModule({
  declarations: [ TypesResultsComponent, AddTypesResultsComponent ],
  imports: [
    CommonModule,
    TypesResultsRoutingModule,
    SharedModule
  ]
})
export class TypesResultsModule { }
