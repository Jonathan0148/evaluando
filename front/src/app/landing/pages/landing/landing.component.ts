import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  visible: boolean = false;
  images: string[] = [];

  constructor(public layoutService: LayoutService, public router: Router) { }
  
  ngOnInit(): void {
    this.images = Array.from({ length: 21 }, (_, i) => `assets/layout/images/carousel/${i + 1}.jpeg`);
  }

  navigateToResults(): void {
    this.router.navigate(['/auth/guest']);
  }

  navigateToInstitutional(): void {
    this.router.navigate(['/institutional']);
  }
}