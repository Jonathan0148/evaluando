import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'admin', component: AppLayoutComponent, data: { title: 'Inicio' },
    children: [
      { path: 'usuarios', data: { title: 'USUARIOS' }, loadChildren: () => import('./modules/settings/users/users.module').then(m => m.UsersModule) },
      { path: 'roles', data: { title: 'ROLES' }, loadChildren: () => import('./modules/settings/roles/roles.module').then(m => m.RolesModule) },
      { path: 'pacientes', data: { title: 'PACIENTES' }, loadChildren: () => import('./modules/settings/patients/patients.module').then(m => m.PatientsModule) },
      { path: 'encuestas', data: { title: 'ENCUESTAS' }, loadChildren: () => import('./modules/settings/surveys/surveys.module').then(m => m.SurveysModule) },
      { path: 'respuestas', data: { title: 'RESPUESTAS' }, loadChildren: () => import('./modules/settings/surveys-answers/surveys-answers.module').then(m => m.SurveysAnswersModule) },
    ]
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
