import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';
import { TypeResult } from '../../types-results/models/type-result.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsPatientsService {


  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  public create(body: TypeResult): Observable<any> {
    this.setParams();
    return this._restSvc.create<TypeResult>(body);
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
    this.setParams();
    return this._restSvc.destroy<any>(id);
  }

  findAll(params: any, body?: any): Observable<any> {
    this.setParams();
    return this._restSvc.post<any>(body, 'findAll', params);
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
    this._restSvc.endPoint = "reports-patients";
  }
}
