import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamsPatientsService {

  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  findAll(params: any, body?: any): Observable<any> {
    this.setParams();
    return this._restSvc.postPatient<any>(body, params);
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
    this._restSvc.endPoint = "patient-exam";
  }
}
