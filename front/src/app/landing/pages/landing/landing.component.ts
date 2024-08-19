import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit{
  visible: boolean = false;

  constructor(public layoutService: LayoutService, public router: Router) { }
  
  ngOnInit(): void {
    this.visible = true;
  }
  
}
