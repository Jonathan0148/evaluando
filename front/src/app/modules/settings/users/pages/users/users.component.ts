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
import { Headquarter } from 'src/app/modules/administration/headquarters/models/headquarter.model';
import { HeadquartersService } from 'src/app/modules/administration/headquarters/services/headquarters.service';


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
    isEdit: boolean = false;
    deleteUserDialog: boolean = false;
    users: User[] = [];
    paramsData: IParamsIndex = { take: 10, page: 1 };
    loading: boolean = false;
    user: User = {};
    submitted: boolean = false;
    roles: Rol[] = [];
    headquarters: Headquarter[] = [];
    canSee: boolean = false;
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;

    constructor(
        private readonly _usersSvc: UsersService,
        private readonly _headquartersSvc: HeadquartersService,
        public readonly router: Router,
        private readonly rolesSvc: RolesService,
        private readonly _filterModuleService: FilterModuleService
    ) { }

    ngOnInit() {
        this.getParamsData();
        this.getRoles({ page: 1, take: 50 });
        this.getHeadquarters({ page: 1, take: 50 });
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

    private getRoles(paramsData?: IParamsIndex): void {
        this.rolesSvc.findAll(paramsData).subscribe((response: any) => {
            const { data } = response;
            this.roles = data;
        })
    }

    private getHeadquarters(paramsData?: IParamsIndex): void {
        this._headquartersSvc.findAll(paramsData).subscribe((response: any) => {
            const { data } = response;
            this.headquarters = data;
        })
    }

    openNew() {
        this.isEdit = false;
        this.isDetail = false;
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
        this.isEdit = true;
        this.userDialog = true;
        this.user = { ...user };
    }

    seeItem(user: User) {
        this.isEdit = false;
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
