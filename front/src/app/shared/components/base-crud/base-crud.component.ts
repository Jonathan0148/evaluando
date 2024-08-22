import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-base-crud',
  template: '',
  styles: []
})
export abstract class BaseCrudComponent implements OnInit, OnDestroy {
  abstract entity: any;
  abstract entityService: any;
  abstract entityFormComponent: any;
  entityDialog: boolean = false;
  deleteDialog: boolean = false;
  deleteMessage: string = '';
  entityData: any = {};
  submitted: boolean = false;
  isDetail: boolean = false;
  paramsData: any = { take: 10, page: 1 };
  loading: boolean = false;
  canSee: boolean = false;
  canCreate: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(protected crudDialogService: CrudService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.crudDialogService.newItem$.subscribe(() => this.openNew()),
      this.crudDialogService.editItem$.subscribe((item: any) => this.editItem(item)),
      this.crudDialogService.viewItem$.subscribe((item: any) => this.viewItem(item)),
      this.crudDialogService.deleteItem$.subscribe((item: any) => this.deleteItem(item)),
      this.crudDialogService.hideDialog$.subscribe(() => this.hideDialog())
    );
    this.loadComponentData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openNew() {
    this.isDetail = false;
    this.entityData = {};
    this.submitted = false;
    this.entityDialog = true;
  }

  editItem(item: any) {
    this.isDetail = false;
    this.entityDialog = true;
    this.entityData = { ...item };
  }

  viewItem(item: any) {
    this.isDetail = true;
    this.entityDialog = true;
    this.entityData = { ...item };
  }

  deleteItem(item: any) {
    this.deleteDialog = true;
    this.deleteMessage = `¿Está seguro de eliminar a ${item.name}?`;
    this.entityData = { ...item };
  }

  hideDialog() {
    this.entityData = {};
    this.entityDialog = false;
    this.submitted = false;
  }

  onSubmit(item: any) {
    const { id } = item;
    if (id) return this.update(item);
    this.create();
  }

  create() {
    this.submitted = true;
    if (!this.entityFormComponent) return;
    const formData = this.entityFormComponent.getFormData();
    if (!formData) return;
    this.entityService.create(formData).subscribe(() => {
    this.getParamsData();
      this.hideDialog();
    });
  }

  update(item: any) {
    this.submitted = true;
    if (!this.entityFormComponent) return;
    const formData = this.entityFormComponent.getFormData();
    if (!formData) return;
    const updatedFormData = { ...item, ...formData };
    this.entityService.update(item.id, updatedFormData).subscribe(() => {
    this.getParamsData();
      this.hideDialog();
    });
  }

  confirmDelete() {
    this.deleteDialog = false;
    this.entityService.delete(this.entityData.id).subscribe(() => {
    this.getParamsData();
    });
    this.entityData = {};
  }

  abstract loadEntities(): void;

  loadComponentData() {
    this.getParamsData();
  }

  getParamsData(): void {
    this.loading = true;
    this.entityService.findAll(this.paramsData).subscribe((response: any) => {
      const { meta } = response;
      this.paramsData.take = meta.itemCount || 1;
      this.loadEntities();
    });
  }
}