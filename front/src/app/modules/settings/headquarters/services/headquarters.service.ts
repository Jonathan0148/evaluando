import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';
import { Headquarter } from '../models/headquarter.model';

@Injectable({
  providedIn: 'root'
})
export class HeadquartersService {
  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  public create(body: Headquarter): Observable<any> {
    this.setParams();
    return this._restSvc.create<Headquarter>(body);
  }

  public findAll(params: any): Observable<Headquarter[]> {
    this.setParams();
    return this._restSvc.getAll<Headquarter[]>(params);
  }

  public update(id: number, body: Headquarter): Observable<any> {
    this.setParams();
    return this._restSvc.update<Headquarter>(id, body);
  }

  public get(id: number): Observable<Headquarter> {
    this.setParams();
    return this._restSvc.show<Headquarter>(id);
  }

  public delete(id: number): Observable<any> {
    return this._restSvc.destroy<any>(id);
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
    this._restSvc.endPoint = "headquarters";
  }
}
