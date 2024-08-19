import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';


@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(
    private _notificationSvc: NotificationService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((response: HttpResponse<any>) => {
        const { body } = response;
        if (body?.message) {
          this._notificationSvc.show('success', 'Operación exitosa', body.message)
        }
      }),
      catchError((err: HttpErrorResponse) => {
        let { message } = err.error;
        if (err.status === 400) {
          message = 'Algunos datos proporcionados son inválidos. Por favor, revise y corrija la información ingresada.';
        } else if (err.status === 401 ) {
          message = 'No tiene permisos suficientes para realizar esta acción.';
        } else if (err.status === 408) {
          message = 'La operación ha tardado demasiado en responder. Por favor, intente nuevamente.';
        } else if (err.status === 500) {
          message = 'Error interno del servidor. Por favor, contacte al soporte técnico.';
        }
        this._notificationSvc.show('error', 'Error', message);
        return throwError(() => new Error(message));
      })
    );
  }
}
