import { Injectable } from '@angular/core';
import { ToastrService, ActiveToast } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  options = {
    closeButton: true, 
    enableHtml: true, 
    progressBar: true, 
    positionClass: 'toast-bottom-right',
    timeOut: 5000, 
  }

  constructor(
    private toastr: ToastrService
  ) { }

  public show(type: string, title: string, message: string): ActiveToast<any> {
    switch (type) {
      case 'success':
        return this.toastr.success(message, title, this.options);
      case 'error':
        return this.toastr.error(message, title, this.options);
      case 'info':
        return this.toastr.info(message, title, this.options);
      case 'warning':
        return this.toastr.warning(message, title, this.options);
      default:
        return this.toastr.show(message, title, this.options, type);
    }
  }
}
