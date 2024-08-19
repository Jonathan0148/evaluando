import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RememberPasswordRoutingModule } from './remember-password-routing.module';
import { RememberPasswordComponent } from './pages/remember-password/remember-password.component';
import { ModalCheckCodeComponent } from './components/modal-check-code/modal-check-code.component';
import { CreateNewPasswordComponent } from './pages/create-new-password/create-new-password.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RememberPasswordComponent, ModalCheckCodeComponent, CreateNewPasswordComponent],
  imports: [
    CommonModule,
    RememberPasswordRoutingModule,
    SharedModule
  ]
})
export class RememberPasswordModule { }
