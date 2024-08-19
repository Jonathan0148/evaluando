import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { InitialModalComponent } from './components/initial-modal/initial-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { InstitutionalComponent } from './pages/institutional/institutional.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NormativityComponent } from './pages/normativity/normativity.component';
import { ResultsComponent } from './pages/results/results.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ LandingComponent, HeaderComponent, CarouselComponent, InitialModalComponent, FooterComponent, LayoutComponent, InstitutionalComponent, ContactComponent, NormativityComponent, ResultsComponent ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ]
})
export class LandingModule { }
