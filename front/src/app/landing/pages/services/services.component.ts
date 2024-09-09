import { Component, OnInit } from '@angular/core';
import { LandingServicesService } from '../services-http/landing-services.service';
import { FileService } from 'src/app/shared/services/file.service';

interface Service {
  name: string;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  selectedService = 0;
  services: Service[] = [];

  constructor(
    private readonly landingServicesService: LandingServicesService,
    public readonly _fileSvc: FileService,
  ) { }

  ngOnInit() {
    this.landingServicesService.findAll().subscribe((response: any) => {
      this.services = response;
    });
  }

  onServiceSelect(index: number) {
    this.selectedService = index;
  }
}