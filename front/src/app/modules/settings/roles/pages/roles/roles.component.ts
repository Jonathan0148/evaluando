import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { IParamsIndex, IResponse } from 'src/app/shared/utils';
import { RolesService } from '../../services/roles.service';
import { AddRolesComponent } from '../add-roles/add-roles.component';
import { Rol } from '../../models/rol.model';
import { FilterModuleService } from 'src/app/shared/services/filter-module.service';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: [ './roles.component.scss' ]

})
export class RolesComponent implements OnInit {
    @ViewChild(AddRolesComponent) modalUserComponent!: AddRolesComponent;

    id: number;
    rolDialog: boolean = false;
    deleteRolDialog: boolean = false;
    roles: Rol[] = [];
    paramsData: IParamsIndex = { take: 10, page: 1 };
    loading: boolean = false;
    rol: Rol = {};
    submitted: boolean = false;
    canSee: boolean = false;
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;
    isDetail: boolean = false;

    constructor(
        private readonly _rolesSvc: RolesService,
        public readonly router: Router,
        private readonly _filterModuleService: FilterModuleService
    ) { }

    ngOnInit() {
        this.getParamsData();
        this.modulePermissions();
    }

    private getParamsData(): void {
        this.loading = true;
        this._rolesSvc.findAll(this.paramsData).subscribe((response: any) => {
            const { meta } = response;
            this.paramsData.take = meta.itemCount || 1;
            this.getRoles();
        });
    }

    private getRoles(): void {
        this._rolesSvc.findAll(this.paramsData).subscribe((response: any) => {
            const { data } = response;
            this.roles = data;
            this.loading = false;
        });
    }

    openNew() {
        this.isDetail = false;
        this.rol = {};
        this.submitted = false;
        this.rolDialog = true;
        this.modalUserComponent.addRolesModules(false);
    }

    onSubmit(rol: Rol) {
        const { id } = rol;
        if (id) return this.update(rol);
        this.create();
        return
    }

    editItem(rol: Rol) {
        this.isDetail = false;
        this.rol = {};
        this.rolDialog = true;
        this.rol = { ...rol };
    }

    seeItem(rol: Rol) {
        this.isDetail = true;
        this.rolDialog = true;
        this.rol = { ...rol };
    }

    update(rol: Rol) {
        this.submitted = true;
        if (!this.modalUserComponent) return;
        const formData = this.modalUserComponent.getFormData();
        if (!formData) return;
        this._rolesSvc.update(this.rol.id, formData).subscribe((data: IResponse) => {
            this.getParamsData();
        });
        this.rol = {};
        this.rolDialog = false;
    }

    deleteItem(rol: Rol) {
        this.deleteRolDialog = true;
        this.rol = { ...rol };
    }

    confirmDelete() {
        this.deleteRolDialog = false;
        this._rolesSvc.delete(this.rol.id).subscribe(response => {
            this.getParamsData();
        })
        this.rol = {};
    }

    hideDialog() {
        this.rol = {};
        this.rolDialog = false;
        this.submitted = false;
    }

    create() {
        this.submitted = true;
        if (!this.modalUserComponent) return;
        const formData = this.modalUserComponent.getFormData();
        if (!formData) return;
        this._rolesSvc.create(formData).subscribe((data: IResponse) => {
            this.getParamsData();
        });
        this.rol = {};
        this.rolDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    modulePermissions() {
        const permissions = this._filterModuleService.modulePermissions('02');
        this.canSee = permissions.canSee;
        this.canCreate = permissions.canCreate;
        this.canEdit = permissions.canEdit;
        this.canDelete = permissions.canDelete;
    }
}
