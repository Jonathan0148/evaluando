import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';import { ExamPatient } from '../models/exam-patient.model';
@Injectable({
  providedIn: 'root'
})
export class ExamsPatientsService {

  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  public create(body: ExamPatient): Observable<any> {
    this.setParams();
    return this._restSvc.create<ExamPatient>(body);
  }

  public update(id: number, body: ExamPatient): Observable<any> {
    this.setParams();
    return this._restSvc.update<ExamPatient>(id, body);
  }

  public get(id: number): Observable<ExamPatient> {
    this.setParams();
    return this._restSvc.show<ExamPatient>(id);
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
    this._restSvc.endPoint = "exams-patients";
  }
}
