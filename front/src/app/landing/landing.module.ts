import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { InitialModalComponent } from './components/initial-modal/initial-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { InstitutionalComponent } from './pages/institutional/institutional.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SharedModule } from '../shared/shared.module';
import { ServicesComponent } from './pages/services/services.component';
import { GalleriaModule } from 'primeng/galleria';


@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    InitialModalComponent,
    FooterComponent,
    LayoutComponent,
    InstitutionalComponent,
    ServicesComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    GalleriaModule
  ]
})
export class LandingModule { }
