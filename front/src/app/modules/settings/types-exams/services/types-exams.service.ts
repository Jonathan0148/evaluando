import { Injectable } from '@angular/core';
import { TypeExam } from '../models/type-exam.model';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesExamsService {
  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  public create(body: TypeExam): Observable<any> {
    this.setParams();
    return this._restSvc.create<TypeExam>(body);
  }

  public findAll(params: any): Observable<TypeExam[]> {
    this.setParams();
    return this._restSvc.getAll<TypeExam[]>(params);
  }

  public update(id: number, body: TypeExam): Observable<any> {
    this.setParams();
    return this._restSvc.update<TypeExam>(id, body);
  }

  public get(id: number): Observable<TypeExam> {
    this.setParams();
    return this._restSvc.show<TypeExam>(id);
  }

  public delete(id: number): Observable<any> {
    return this._restSvc.destroy<any>(id);
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
    this._restSvc.endPoint = "types-exams";
  }
}
