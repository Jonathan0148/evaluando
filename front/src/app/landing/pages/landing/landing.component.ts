import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LandingServicesService } from '../services-http/landing-services.service';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  visible: boolean = false;
  images: string[] = [];
  services = [];

  constructor(
    public layoutService: LayoutService, 
    public router: Router,
    private readonly landingServicesService: LandingServicesService,
    public readonly _fileSvc: FileService,
  ) { }
  
  ngOnInit(): void {
    this.images = Array.from({ length: 21 }, (_, i) => `assets/layout/images/carousel/${i + 1}.jpeg`);
    this.landingServicesService.findAll().subscribe((response: any) => {
      this.services = response.slice(0, 3);
    });
  }

  navigateToResults(): void {
    this.router.navigate(['/auth/guest']);
  }

  navigateToInstitutional(fragment: string): void {
    this.router.navigate(['/institutional'], { fragment });
  }

  navigateToServices(): void {
    this.router.navigate(['/services']);
  }
}