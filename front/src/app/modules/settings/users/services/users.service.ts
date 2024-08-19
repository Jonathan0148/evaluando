import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  public create(body: User): Observable<any> {
    this.setParams();
    return this._restSvc.create<User>(body);
  }

  public findAll(params: any): Observable<User[]> {
    this.setParams();
    return this._restSvc.getAll<User[]>(params);
  }

  public update(id: number, body: User): Observable<any> {
    this.setParams();
    return this._restSvc.update<User>(id, body);
  }

  public get(id: number): Observable<User> {
    this.setParams();
    return this._restSvc.show<User>(id);
  }

  public delete(id: number): Observable<any> {
    this.setParams();
    return this._restSvc.destroy<any>(id);
  }

  public changePassword(data: Object): Observable<any> {
    this.setParams()
    return this._restSvc.post<any>(data, 'changePassword');
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
    this._restSvc.endPoint = "users";
  }  
}
