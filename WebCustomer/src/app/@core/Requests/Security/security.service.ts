import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { environment } from '@env/environment';

/**
 *
 *
 * @export
 * @interface ActivationCodeRequest
 */
export interface ActivationCodeRequest {
  customerId: string;
  profile: string;
}

/**
 *
 *
 * @export
 * @interface ActivateUserRequest
 */
export interface ActivateUserRequest {
  customerId: string;
  profile: string;
  acivationCode: string;
}
/**
 *
 *
 * @export
 * @interface ActivationCodeResponse
 */
export interface ActivationCodeResponse {
  activationCode: string;
  profile: string;
  customerId: string;
}
/**
 *
 *
 * @export
 * @interface ServerResponse
 */
export interface ActivateUserResponse {
  // Customize received credentials here
  message: any;
}

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private urlService = environment.serviceServerUrl; //'http://localhost:52633';
  private urlActivationCode = this.urlService + '/api/Security/ActivationCode';
  private urlActivateUser = this.urlService + '/api/Security/ActivateUser';
  constructor(private http: HttpClient) {}

  /**
   *
   *
   * @param {ActivationCodeRequest} context
   * @return {*}  {Observable<ActivationCodeResponse>}
   * @memberof SecurityService
   */
  ActivationCode(context: ActivationCodeRequest): Observable<ActivationCodeResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const request = JSON.stringify(context);
    return (
      this.http
        .post(
          this.urlActivationCode,
          request,
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          return this.extractDataObservable(res);
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }
  /**
   *
   *
   * @param {ActivationCodeRequest} context
   * @return {*}  {Observable<ServerResponse>}
   * @memberof SecurityService
   */
  ActivateUser(context: ActivateUserRequest): Observable<ActivateUserResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const request = JSON.stringify(context);
    return (
      this.http
        .post(
          this.urlActivateUser,
          request,
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          return this.extractDataObservable(res);
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
   * @memberof SecurityService
   */
  private extractDataObservable(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }

    // const rta: ActivationCodeResponse = {
    //   activationCode: res.data[0].activationCode,
    // };
    return res.data[0];
  }
  /**
   *
   *
   * @private
   * @param {*} error
   * @return {*}  {Observable<any>}
   * @memberof SecurityService
   */
  private handleErrorObservable(error: any): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console

    console.error(error);
    return Observable.throw(error.message || 'Server error');
  }
}
