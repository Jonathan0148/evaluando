import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { headers } from '../utils/context-http';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  private headers: HttpHeaders = headers;
  private apiUrl: string = environment.serverUrl;
  /**
   * URL del Endpoint donde apunta
   * @type {string}
   * @memberof RestService
   */
  public endPoint: string = '';
  /**
   * Nos pregunta el puerto del microservicio
   * @type {Number}
   * @memberof RestService
   */
  public port: number = environment.portsServices.api;
  public isNeedToken: boolean = true;

  constructor(
    private httpClient: HttpClient,
    private _cookieSvc: CookieService,
  ) {
    if (this.isNeedToken) {
      const token = this._cookieSvc.get('token');
      this.headers = this.headers.set('Authorization', `Bearer ${token}`)
    }
  }

  private getEndoint(): string {
    return `${this.apiUrl}${this.port}/api/${this.endPoint}`;
  }

  private setHeaders(): HttpHeaders {
    const token = this._cookieSvc.get('token');
    return this.headers.set('Authorization', `Bearer ${token}`);
  }

  public getAll<T>(paramsData: any = null): Observable<T> {
    let params = new HttpParams();
    params = params.set('take', paramsData?.take ?? 10);
    params = params.set('page', paramsData?.page ?? 1);
    params = params.set('term', paramsData?.term ?? "");

    return this.httpClient.get<T>(this.getEndoint(), { params, headers: this.setHeaders() });
  }

  /**
   * Funcion que muestra un item dependiendo su ID
   * @template T
   * @param {number} id
   * @return {*}  {Observable<T>}
   * @memberof RestService
   */
  public show<T>(id: number): Observable<T> {
    return this.httpClient.get<T>(
      `${this.getEndoint()}/${id}`, {
      headers: this.setHeaders()
    }
    )
  }

  /**
   * Funcion que llama a la función crear Item
   * @param data Información que se desea crear
   * @returns Observable dependiendo el tipo de dato a mostrar
   */
  public create<T>(data: any): Observable<T> {
    return this.httpClient.post<T>(
      this.getEndoint(),
      data, {
      headers: this.setHeaders()
    }
    );
  }

  /**
   * Funcion que actualiza un registro en la base de datos
   * @template T
   * @param {number} id Valor a buscar
   * @param {any} data información que se va a modificar
   * @return {*}  {Observable<T>} Observable dependiendo el tipo de dato a mostrar
   * @memberof RestService
   */
  public update<T>(id: number, data: any): Observable<T> {
    return this.httpClient.put<T>(
      `${this.getEndoint()}/${id}`,
      data, {
      headers: this.setHeaders()
    }
    );
  }

  /**
   * Funcion que llama al endPoint para eliminar un registro
   * @template T
   * @param {number} id llave del registro a eliminar
   * @return {*}  {Observable<T>}
   * @memberof RestService
   */
  public destroy<T>(id: number): Observable<T> {
    return this.httpClient.delete<T>(
      `${this.getEndoint()}/${id}`, {
      headers: this.setHeaders()
    });
  }

  public importFile(data: FormData): Observable<any> {
    return this.httpClient.post(`${this.getEndoint()}/importFile`, data);
  }

  /**
   * Funcion que llama el metodo POST
   * @param data Información que se desea crear
   * @returns Observable dependiendo el tipo de dato a mostrar
   */
  public post<T>(data: any, url: string, paramsData?: any): Observable<T> {
    let params = new HttpParams();

    params = params.set('take', paramsData?.take ?? 10)
    params = params.set('page', paramsData?.page ?? 1);
    params = params.set('term', paramsData?.term ?? "");

    return this.httpClient.post<T>(
      `${this.getEndoint()}/${url}`,
      data, {
      params,
      headers: this.setHeaders()
    }
    );
  }

  public postPatient<T>(data: any = [], paramsData?: any): Observable<T> {
    let params = new HttpParams();

    params = params.set('take', paramsData?.take ?? 10)
    params = params.set('page', paramsData?.page ?? 1);
    params = params.set('term', paramsData?.term ?? "");

    return this.httpClient.post<T>(`${this.getEndoint()}/`, data, { params });
  }

  /**
 * Funcion que llama el metodo GET
 * @param id Información que se desea crear
 * @returns Observable dependiendo el tipo de dato a mostrar
 */
  public get<T>(id: number, url: string): Observable<T> {
    return this.httpClient.get<T>(
      `${this.getEndoint()}/${url}/${id}`, {
      headers: this.setHeaders()
    }
    );
  }


  public getUrl<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(
      `${this.getEndoint()}/${url}`, {
      headers: this.setHeaders()
    });
  }

  public getPostUrl<T>(url: string): Observable<T> {
    return this.httpClient.post<T>(
      `${this.getEndoint()}/${url}`, {
      headers: this.setHeaders()
    });
  }

  public methodPost<T>(data: any, url: string): Observable<T> {
    return this.httpClient.post<T>(
      `${this.getEndoint()}/${url}`,
      data, {
      headers: this.setHeaders()
    });
  }
  // public getNextCode<T>(model: IModels): Observable<T> {
  // 	const params = new HttpParams().set('model', model)
  // 	return this.httpClient.get<T>(
  // 		`${environment.serverUrl}/generic/next-code`, {
  // 		params: params,
  // 		headers: this.headers
  // 	}
  // 	)
  // }
}