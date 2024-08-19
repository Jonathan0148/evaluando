import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'recuperar-contrasena',
    data: {
      title: 'Recuperar Contrasena'
    },
    loadChildren: () => import('./remember-password/remember-password.module').then(m => m.RememberPasswordModule)
  },
  {
    path: 'crear-nueva-contrasena',
    data: {
      title: 'Recuperar Contrasena'
    },
    loadChildren: () => import('./remember-password/remember-password.module').then(m => m.RememberPasswordModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
