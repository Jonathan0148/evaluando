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
                label: 'Institucional',
                icon: 'pi pi-palette',
                route: '/institutional'

            },
            {
                label: 'Resultados',
                icon: 'pi pi-palette',
                route: '/results'

            },
            {
                label: 'Contacto',
                icon: 'pi pi-home',
                route: '/contact'
            },
            {
                label: 'Normatividad',
                icon: 'pi pi-home',
                route: '/normativity'
            }
        ];
    }

    onResultsClick(){
        this.router.navigate(['auth/guest'])
    }

    onLogin(){
        this.router.navigate(['auth/login'])
    }
}
