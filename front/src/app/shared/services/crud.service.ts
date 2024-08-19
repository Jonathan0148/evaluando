import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private newItemSubject = new Subject<void>();
  private editItemSubject = new Subject<any>();
  private viewItemSubject = new Subject<any>();
  private deleteItemSubject = new Subject<any>();
  private hideDialogSubject = new Subject<void>();

  newItem$ = this.newItemSubject.asObservable();
  editItem$ = this.editItemSubject.asObservable();
  viewItem$ = this.viewItemSubject.asObservable();
  deleteItem$ = this.deleteItemSubject.asObservable();
  hideDialog$ = this.hideDialogSubject.asObservable();

  openNew() {
    this.newItemSubject.next();
  }

  editItem(item: any) {
    this.editItemSubject.next(item);
  }

  viewItem(item: any) {
    this.viewItemSubject.next(item);
  }

  deleteItem(item: any) {
    this.deleteItemSubject.next(item);
  }

  hideDialog() {
    this.hideDialogSubject.next();
  }
}