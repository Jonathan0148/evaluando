import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { NormativityComponent } from './pages/normativity/normativity.component';
import { InstitutionalComponent } from './pages/institutional/institutional.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ResultsComponent } from './pages/results/results.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'landing', component: LandingComponent },
      { path: 'normativity', component: NormativityComponent },
      { path: 'institutional', component: InstitutionalComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'results', component: ResultsComponent },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LandingRoutingModule { }
