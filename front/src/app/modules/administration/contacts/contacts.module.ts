import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddContactsComponent } from './pages/add-contacts/add-contacts.component';
import { ContactsComponent } from './pages/contacts/contacts.component';


@NgModule({
  declarations: [ContactsComponent, AddContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule
  ]
})
export class ContactsModule { }
