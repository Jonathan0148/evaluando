import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-global-table',
  templateUrl: './global-table.component.html',
  styleUrl: './global-table.component.scss'
})

export class GlobalTableComponent {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() loading: boolean = false;
  @Input() paginator: boolean = true;
  @Input() rows: number = 10;
  @Input() rowsPerPageOptions: number[] = [ 10, 20, 30 ];
  @Input() currentPageReportTemplate: string = 'Mostrando {first} a {last} de {totalRecords} entradas';
  @Input() globalFilterFields: string[] = [];
  @Input() selectionMode: string = 'multiple';
  @Input() dataKey: string = 'id';
  @Input() showCurrentPageReport: boolean = true;

  @Output() onNew = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();

  @Input() canSee: boolean = false;
  @Input() canCreate: boolean = false;
  @Input() canEdit: boolean = false;
  @Input() canDelete: boolean = false;

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  newRecord() {
    this.onNew.emit();
  }

  editRecord(record: any) {
    this.onEdit.emit(record);
  }

  viewRecord(record: any) {
    this.onView.emit(record);
  }

  deleteRecord(record: any) {
    this.onDelete.emit(record);
  }
}