import { Injectable } from '@angular/core';
import { Survey } from '../models/surveys.model';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  public create(body: Survey): Observable<any> {
    this.setParams();
    return this._restSvc.create<Survey>(body);
  }

  public findAll(params: any): Observable<Survey[]> {
    this.setParams();
    return this._restSvc.getAll<Survey[]>(params);
  }

  public update(id: number, body: Survey): Observable<any> {
    this.setParams();
    return this._restSvc.update<Survey>(id, body);
  }

  public get(id: number): Observable<Survey> {
    this.setParams();
    return this._restSvc.show<Survey>(id);
  }

  public delete(id: number): Observable<any> {
    this.setParams();
    return this._restSvc.destroy<any>(id);
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
    this._restSvc.endPoint = "surveys";
  }
}
