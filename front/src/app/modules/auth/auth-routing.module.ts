import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionComponent } from './components/selection/selection.component';
import { loginGuard } from 'src/app/shared/guards/login.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'selection',
    pathMatch: 'full'
  },
  {
    path: 'selection',
    component: SelectionComponent,
    data: {
      title: 'Seleccionar'
    }
  },
  {
    path: 'login',
    data: {
      title: 'Iniciar sesion'
    },
    canActivate: [ loginGuard ],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'guest',
    data: {
      title: 'Paciente'
    },
    loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule)
  },
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
