import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingServicesService {

  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  findAll(): Observable<any> {
    this._restSvc.endPoint = "landing/getServices";
    return this._restSvc.postPatient<any>();
  }

  getHeadquarters(): Observable<any> {
    this._restSvc.endPoint = "landing/getHeadquarters";
    return this._restSvc.getAll<any>();
  }

  createContact(data: any): Observable<any> {
    this._restSvc.endPoint = "landing/createContact";
    return this._restSvc.create<any>(data);
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
  }
}