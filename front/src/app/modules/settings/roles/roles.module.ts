import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRolesComponent } from './pages/add-roles/add-roles.component';
import { SelectButtonModule } from 'primeng/selectbutton';


@NgModule({
  declarations: [
    RolesComponent,
    AddRolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
		SelectButtonModule,
  ]
})
export class RolesModule { }
