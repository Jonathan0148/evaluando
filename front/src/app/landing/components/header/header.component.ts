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
                label: 'institutional',
                icon: 'pi pi-palette',
                route: '/institutional'

            },
            {
                label: 'results',
                icon: 'pi pi-palette',
                route: '/results'

            },
            {
                label: 'contact',
                icon: 'pi pi-home',
                route: '/contact'
            },
            {
                label: 'normativity',
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
