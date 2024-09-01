import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { administration, setting } from './menu.options';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private cookieService: CookieService
    ) { }

    ngOnInit(): void {
        { this.model = this.getAdminMenu(); }
    }

    private getAdminMenu(): any[] {
        const permissions = this.permissionsModules();
        return [
            { label: 'INICIO', items: [ { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: [ '/inicio' ] } ] },
            ...permissions
        ];
    }

    private permissionsModules(): any[] {
        const token = this.cookieService.get('token');
        const decodedJwt: any = jwtDecode(token);
        const modules = decodedJwt.modules;

        const filterMenuItems = (items: any[]): any[] => {
            return items.filter(item => modules.some(permission => permission.codeModule === item.code));
        };

        const settingItems = setting?.items[ 0 ]?.items || [];
        const administrationItems = administration?.items[ 0 ]?.items || [];

        const filteredSettingItems = filterMenuItems(settingItems);
        const filteredAdministrationItems = filterMenuItems(administrationItems);

        setting.items[ 0 ].items = filteredSettingItems;
        administration.items[ 0 ].items = filteredAdministrationItems;

        return [ setting, administration ];
    }
}