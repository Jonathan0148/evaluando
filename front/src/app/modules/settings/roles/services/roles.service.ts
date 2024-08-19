import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  public create(body: Rol): Observable<any> {
    this.setParams();
    return this._restSvc.create<Rol>(body);
  }

  public findAll(params: any): Observable<Rol[]> {
    this.setParams();
    return this._restSvc.getAll<Rol[]>(params);
  }

  public update(id: number, body: Rol): Observable<any> {
    this.setParams();
    return this._restSvc.update<Rol>(id, body);
  }

  public get(id: number): Observable<Rol> {
    this.setParams();
    return this._restSvc.show<Rol>(id);
  }

  public delete(id: number): Observable<any> {
    return this._restSvc.destroy<any>(id);
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
    this._restSvc.endPoint = "roles";
  }  
}
