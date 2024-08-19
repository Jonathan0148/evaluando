import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { IParamsIndex, IResponse } from 'src/app/shared/utils';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { Router } from '@angular/router';
import { RolesService } from '../../../roles/services/roles.service';
import { Rol } from '../../../roles/models/rol.model';
import { FilterModuleService } from 'src/app/shared/services/filter-module.service';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: [ './users.component.scss' ]
})
export class UsersComponent implements OnInit {
    @ViewChild(ModalUserComponent) modalUserComponent!: ModalUserComponent;

    id: number;
    userDialog: boolean = false;
    isDetail: boolean = false;
    deleteUserDialog: boolean = false;
    users: User[] = [];
    paramsData: IParamsIndex = { take: 10, page: 1 };
    loading: boolean = false;
    user: User = {};
    submitted: boolean = false;
    roles: Rol[] = [];
    canSee: boolean = false;
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;
    changePass: boolean = false;

    constructor(
        private readonly _usersSvc: UsersService,
        public readonly router: Router,
        private readonly rolesSvc: RolesService,
        private readonly _filterModuleService: FilterModuleService
    ) { }

    ngOnInit() {
        this.getParamsData();
        this.getRoles();
        this.modulePermissions();
    }

    private getParamsData(): void {
        this.loading = true;
        this._usersSvc.findAll(this.paramsData).subscribe((response: any) => {
            const { meta } = response;
            this.paramsData.take = meta.itemCount || 1;
            this.getUsers();
        });
    }

    private getUsers(): void {
        this._usersSvc.findAll(this.paramsData).subscribe((response: any) => {
            const { data } = response;
            this.users = data;
            this.loading = false;
        });
    }

    private getRoles(): void {
        this.rolesSvc.findAll(this.paramsData).subscribe((response: any) => {
            const { data } = response;
            this.roles = data;
        })
    }

    openNew() {
        this.isDetail = false;
        this.changePass = false;
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    onSubmit(user: User) {
        const { id } = user;
        if (id) return this.update(user);
        this.create();
        return
    }

    editItem(user: User) {
        this.isDetail = false;
        this.changePass = true;
        this.userDialog = true;
        this.user = { ...user };
    }

    seeItem(user: User) {
        this.changePass = false;
        this.isDetail = true;
        this.userDialog = true;
        this.user = { ...user };
    }

    update(user: User) {
        this.submitted = true;
        if (!this.modalUserComponent) return;
        const formData = this.modalUserComponent.getFormData();
        if (!formData) return;
        const updatedFormData: User = { ...user, ...formData };
        this._usersSvc.update(this.user.id, updatedFormData).subscribe((data: IResponse) => {
            this.getParamsData();
        });
        this.user = {};
        this.userDialog = false;
    }

    deleteItem(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this._usersSvc.delete(this.user.id).subscribe(response => {
            this.getParamsData();
        })
        this.user = {};
    }

    hideDialog() {
        this.user = {};
        this.userDialog = false;
        this.submitted = false;
    }

    create() {
        this.submitted = true;
        if (!this.modalUserComponent) return;
        const formData = this.modalUserComponent.getFormData();
        if (!formData) return;
        formData.is_active = true;
        this._usersSvc.create(formData).subscribe((data: IResponse) => {
            this.getParamsData();
        });
        this.user = {};
        this.userDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    modulePermissions() {
        const permissions = this._filterModuleService.modulePermissions('03');

        this.canSee = permissions.canSee;
        this.canCreate = permissions.canCreate;
        this.canEdit = permissions.canEdit;
        this.canDelete = permissions.canDelete;
    }
}
