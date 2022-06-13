import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, of, Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { PacPlanes } from '@entities';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  private urlService = environment.serviceServerUrl;
  private GetPlans = this.urlService + '/api/Plans/GetPlansActive';
  constructor(private http: HttpClient) {}

  /**
   *
   *
   * @return {*}  {Observable<PacPlanes>}
   * @memberof ParametersService
   */
  getPlans(): Observable<PacPlanes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .get(this.GetPlans, httpOptions)
        .map((res) => {
          const rta = this.extractDataDefault(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }
  /**
   *
   *
   * @private
   * @param {*} res
   * @return {*}
   * @memberof PlansService
   */
  private extractDataDefault(res: any): any {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }
    return res.data;
  }
  /**
   *
   *
   * @private
   * @param {*} error
   * @return {*}  {Observable<any>}
   * @memberof PlansService
   */
  private handleErrorObservable(error: any): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console

    console.error(error);
    return Observable.throw(error.message || 'Server error');
  }
}
