import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  public create(body: Service): Observable<any> {
    this.setParams();
    return this._restSvc.create<Service>(body);
  }

  public findAll(params: any): Observable<Service[]> {
    this.setParams();
    return this._restSvc.getAll<Service[]>(params);
  }

  public update(id: number, body: Service): Observable<any> {
    this.setParams();
    return this._restSvc.update<Service>(id, body);
  }

  public get(id: number): Observable<Service> {
    this.setParams();
    return this._restSvc.show<Service>(id);
  }

  public delete(id: number): Observable<any> {
    return this._restSvc.destroy<any>(id);
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
    this._restSvc.endPoint = "services";
  }
}
