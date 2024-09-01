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
    items: MenuItem[] | undefined;

    constructor(public layoutService: LayoutService, public router: Router) { }

    ngOnInit() {
        this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-palette',
                route: '/'
            },
            {
                label: 'Institucional',
                icon: 'pi pi-palette',
                route: '/institutional'
            },
            {
                label: 'Servicios',
                icon: 'pi pi-palette',
                route: '/services'
            },
            {
                label: 'Blogs',
                icon: 'pi pi-home',
                route: '/blogs'
            },
            {
                label: 'Contacto',
                icon: 'pi pi-envelope',
                route: '/contact'
            },            
            {
                label: 'Resultados',
                icon: 'pi pi-book',
                route: '/auth/guest'
            },           
            {
                label: 'Contacto',
                icon: 'pi pi-user',
                route: '/auth/login'
            },
        ];
    }

    onResultsClick(){
        this.router.navigate(['auth/guest'])
    }

    onLogin(){
        this.router.navigate(['auth/login'])
    }
}
