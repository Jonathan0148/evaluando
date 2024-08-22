import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadquartersRoutingModule } from './headquarters-routing.module';
import { HeadquartersComponent } from './pages/headquarters/headquarters.component';
import { AddHeadquartersComponent } from './pages/add-headquarters/add-headquarters.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ HeadquartersComponent, AddHeadquartersComponent ],
  imports: [
    CommonModule,
    HeadquartersRoutingModule,
    SharedModule
  ]
})
export class HeadquartersModule { }
