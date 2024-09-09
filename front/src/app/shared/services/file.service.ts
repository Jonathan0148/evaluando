import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { IFileResponse } from '../utils';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from './rest.service';
import { headers } from '../utils/context-http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl: string = environment.serverUrl;
  private port: number = environment.portsServices.api;
  private headers: HttpHeaders = headers;
  public isNeedToken: boolean = true;


  constructor(
    private http: HttpClient,
    private _notificationSvc: NotificationService,
    private _restSvc: RestService,
    private _cookieSvc: CookieService,
  ) {
    if (this.isNeedToken) {
      const token = this._cookieSvc.get('token');
      this.headers = this.headers.set('Authorization', `Bearer ${token}`, )
    }
  }

  public setNameFileForm(form: FormGroup, name: string, value: any): void {
    return form.get(name).setValue(value);
  }

  public uploadFile(file: File):Observable<IFileResponse> {
    const token = this._cookieSvc.get('token'); 
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<IFileResponse>(this.getUrl(), formData, {
      headers: {
        'Authorization': `Bearer ${token}`, 
        'responseType': 'json'
      },
    });
  }

  public validateFile(file: File): boolean {
    if (!file.type.includes('pdf')) {
      this._notificationSvc.show('error', 'Archivo no permitido', 'Solo se permiten archivos PDF.');
      return false;
    }

    if (file.size > environment.maxFileSize) {
      this._notificationSvc.show('error', 'Archivo demasiado grande', `El tamaño máximo permitido es ${environment.maxFileSize / 1000000}MB.`);
      return false;
    }

    return true;
  }

  public validateImageFile(file: File): boolean {

    if (file.size > environment.maxFileSize) {
      this._notificationSvc.show('error', 'Ha ocurrido algo...', 'El peso máximo de los archivos es ' + environment.maxFileSize);
      return false
    }

    return true
  }

  public getUrlFile(name: string): string {
    return `${environment.serverUrl}${environment.portsServices.api}/${name}`
  }

  private getUrl(): string {
    return `${this.apiUrl}${this.port}/api/upload`;
  }



}
