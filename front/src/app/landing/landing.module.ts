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
import { SharedModule } from '../shared/shared.module';
import { TopBannerComponent } from './components/top-banner/top-banner.component';
import { HeadquartersComponent } from './pages/headquarters/headquarters.component';
import { ServicesComponent } from './pages/services/services.component';
import { BlogsComponent } from './pages/blogs/blogs.component';


@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    CarouselComponent,
    InitialModalComponent,
    FooterComponent,
    LayoutComponent,
    InstitutionalComponent,
    HeadquartersComponent,
    ServicesComponent,
    BlogsComponent,
    ContactComponent,
    TopBannerComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ]
})
export class LandingModule { }
