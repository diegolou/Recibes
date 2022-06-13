import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of, Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

export interface ServerResponse {
  // Customize received credentials here
  message: any;
}
@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private urlService = environment.ServiceServerUrl; //'http://localhost:52633';
  private urlGeoLocationUser = this.urlService + '/api/GeoLocation/SetPackerGeoLocation';
  constructor(private http: HttpClient) {}

  setGeoLocation(idPacker: string, latitude: number, longitude: number): Observable<ServerResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(this.urlGeoLocationUser, this.SetGeoLocationValueJson(idPacker, latitude, longitude), httpOptions)
      .map((res) => {
        const rta = this.extractDataObservable(res);
        return rta;
      })
      .catch(this.handleErrorObservable);
    // alert(this.urlAuthenticateUser) ;
    //debuger;
    // return (
    //   this.http
    //     .post(
    //       this.urlGeoLocationUser,
    //       JSON.stringify(
    //         this.SetGeoLocationValueJson(
    //           idPacker,
    //           latitude,
    //           longitude
    //           )
    //         )
    //       ),
    //       // return this.http.get(this.urlAuthenticateUser,
    //       httpOptions
    //     )
    //     .map((res : any) => {
    //       const rta = this.extractDataObservable(res);
    //       return rta;
    //     })
    //     // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
    //     .catch(this.handleErrorObservable)
    // );
  }
  private SetGeoLocationValueJson(idPacker: string, latitude: number, longitude: number) {
    //debuger;
    const x = {
      PackerId: idPacker,
      Latitude: latitude,
      Longitude: longitude,
    };
    return x;
  }
  private extractDataObservable(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }

    // const info: Credentials = {
    //   username: res.data[0].userInfo.userAccount,
    //   token: res.data[0].userInfo.password,
    //   usernamedescrip:
    //     res.data[0].userInfo.firstName + ' ' + res.data[0].userInfo.lastName,
    //   role: res.data[0].userInfo.role
    // };
    // debugger;
    //   token: '123456',
    const rta: ServerResponse = {
      message: res.data[0].message,
    };
    return rta;
  }
  private handleErrorObservable(error: any): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console

    console.error(error);
    return Observable.throw(error.message || 'Server error');
  }
}
