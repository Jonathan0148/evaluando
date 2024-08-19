import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RememberPasswordComponent } from './pages/remember-password/remember-password.component';
import { CreateNewPasswordComponent } from './pages/create-new-password/create-new-password.component';

const routes: Routes = [
  { path: '', component: RememberPasswordComponent },
  { path: 'crear', component: CreateNewPasswordComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RememberPasswordRoutingModule { }
