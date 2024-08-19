import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  public create(body: Patient): Observable<any> {
    this.setParams();
    return this._restSvc.create<Patient>(body);
  }

  public findAll(params: any): Observable<Patient[]> {
    this.setParams();
    return this._restSvc.getAll<Patient[]>(params);
  }

  public update(id: number, body: Patient): Observable<any> {
    this.setParams();
    return this._restSvc.update<Patient>(id, body);
  }

  public get(id: number): Observable<Patient> {
    this.setParams();
    return this._restSvc.show<Patient>(id);
  }

  public delete(id: number): Observable<any> {
    this.setParams();
    return this._restSvc.destroy<any>(id);
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
    this._restSvc.endPoint = "patients";
  }
}
