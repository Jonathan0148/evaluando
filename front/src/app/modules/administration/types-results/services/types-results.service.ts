import { Injectable } from '@angular/core';
import { TypeResult } from '../models/type-result.model';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesResultsService {
  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  public create(body: TypeResult): Observable<any> {
    this.setParams();
    return this._restSvc.create<TypeResult>(body);
  }

  public findAll(params: any): Observable<TypeResult[]> {
    this.setParams();
    return this._restSvc.getAll<TypeResult[]>(params);
  }

  public update(id: number, body: TypeResult): Observable<any> {
    this.setParams();
    return this._restSvc.update<TypeResult>(id, body);
  }

  public get(id: number): Observable<TypeResult> {
    this.setParams();
    return this._restSvc.show<TypeResult>(id);
  }

  public delete(id: number): Observable<any> {
    return this._restSvc.destroy<any>(id);
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
    this._restSvc.endPoint = "types-results";
  }
}
