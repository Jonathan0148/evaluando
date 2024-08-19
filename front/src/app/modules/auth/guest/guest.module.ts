import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './pages/guest.component';
import { AuthService } from '../services/auth.service';
import { GuestRoutingModule } from './guest-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [GuestComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule
  ],
  providers:[ AuthService ]
})
export class GuestModule { }
