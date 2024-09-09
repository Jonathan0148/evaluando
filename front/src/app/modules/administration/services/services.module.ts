import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicesComponent } from './pages/services/services.component';
import { AddServicesComponent } from './pages/add-services/add-services.component';


@NgModule({
  declarations: [ServicesComponent, AddServicesComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule
  ]
})
export class ServicesModule { }
