import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SelectionComponent } from './components/selection/selection.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ SelectionComponent ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
