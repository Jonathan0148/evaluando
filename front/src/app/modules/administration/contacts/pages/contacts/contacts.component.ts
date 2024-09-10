import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  form!: UntypedFormGroup;
  messages: any;
  loading: boolean = false;
  messageDialog: boolean = false;
  message: any = {};

  constructor(
    private readonly _contactsSvc: ContactsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private readonly _restSvc: RestService,
  ) { }

  ngOnInit(): void {
    this.getMessages();
  }

  public getMessages() {
    this._contactsSvc.setParams();
    this.loading = true;
    this._restSvc.getUrl('getCasesContact').subscribe((res: any) => {
      const { data } = res;
      this.messages = data.map((element: any) => {
        element.stateString = (element.state === 1 ? 'Pendiente ' : ' Resuelto ');
        return element;
      });
      this.loading = false;
    });
  }

  seeItem(message: any) {
    this.messageDialog = true;
    this.message = { ...message };
  }

  resolveItem(message: any) {
    this.confirmationService.confirm({
      header: 'Confirmación',
      message: 'Por favor confirme para continuar.',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      acceptLabel: 'Sí',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this._restSvc.put(message.id, 'updateStateCase').subscribe((res: any) => {
          this.getMessages();
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Operación cancelada', life: 5000 });
      }
    });
  }

  hideDialog() {
    this.message = {};
    this.messageDialog = false;
  }

  getSeverity(status: number) {
    switch (status) {
      case 1: return 'warning';
      case 2: return 'primary';
    }
    return '';
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
