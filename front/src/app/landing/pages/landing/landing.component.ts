import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LandingServicesService } from '../services-http/landing-services.service';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: [ './landing.component.scss' ]
})
export class LandingComponent implements OnInit {
  visible: boolean = false;
  images: any[] | undefined;
  services = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  constructor(
    public layoutService: LayoutService,
    public router: Router,
    private readonly landingServicesService: LandingServicesService,
    public readonly _fileSvc: FileService,
  ) { }

  ngOnInit(): void {
    this.landingServicesService.getImages().then((images: any) => (this.images = images));
    this.landingServicesService.findAll().subscribe((response: any) => {
      this.services = response.slice(0, 3);
    });
  }

  navigateToResults(): void {
    this.router.navigate([ '/auth/guest' ]);
  }

  navigateToInstitutional(fragment: string): void {
    this.router.navigate([ '/institutional' ], { fragment });
  }

  navigateToContact(): void {
    this.router.navigate([ '/contact' ]);
  }

  navigateToServices(): void {
    this.router.navigate([ '/services' ]);
  }
}