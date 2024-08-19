import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientLoginService {

  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }
  
  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
    this._restSvc.endPoint = "patient-login";
  }
}
