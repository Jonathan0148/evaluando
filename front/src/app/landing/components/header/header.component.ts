import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    readonly menuItems: MenuItem[] = [
        { label: 'Inicio', icon: 'pi pi-home', route: '/' },
        { label: 'Institucional', icon: 'pi pi-info-circle', route: '/institutional' },
        { label: 'Servicios', icon: 'pi pi-briefcase', route: '/services' },
        { label: 'Contáctenos', icon: 'pi pi-envelope', route: '/contact' }
    ];

    constructor(
        public layoutService: LayoutService, 
        public router: Router
    ) {}
}