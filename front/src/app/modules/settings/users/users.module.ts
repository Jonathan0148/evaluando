import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './pages/users/users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ModalUserComponent } from './pages/modal-user/modal-user.component';

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
