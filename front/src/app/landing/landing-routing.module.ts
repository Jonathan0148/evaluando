import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { InstitutionalComponent } from './pages/institutional/institutional.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HeadquartersComponent } from './pages/headquarters/headquarters.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ServicesComponent } from './pages/services/services.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'landing', component: LandingComponent },
      { path: 'institutional', component: InstitutionalComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'headquarters', component: HeadquartersComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'services', component: ServicesComponent },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LandingRoutingModule { }
