import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';import { ModalUserComponent } from './pages/modal-user/modal-user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  declarations: [
    UsersComponent,
    ModalUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule  
  ],
})
export class UsersModule { }
