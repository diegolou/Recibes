import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of, Subject } from 'rxjs';
import { CryptoService } from '@core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { GeoLocation } from '@app/Entities';

export interface GeoLocationResponse {
  GeoLocationList: GeoLocation[];
}

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  private urlService = environment.serviceServerUrl; //'http://localhost:52633';
  private GetGeoLocation = this.urlService + '/api/GeoLocation/GetPackerGeoLocationCustomer';
  constructor(private http: HttpClient) {}

  getGeoLocationCustomer(packerId: string, ActivityId: string): Observable<GeoLocationResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .post(
          this.GetGeoLocation,
          JSON.stringify(this.SetGetGeoLocationJson(packerId, ActivityId)),
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          const rta = this.extractDataGetLocationObservable(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }
  private SetGetGeoLocationJson(packerId: string, activityId: string) {
    const x = {
      packerId: packerId,
      activityId: activityId,
    };
    return x;
  }
  private extractDataGetLocationObservable(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }
    let geoLocationList: GeoLocation[] = new Array<GeoLocation>();
    let key,
      count = 0;
    for (key in res.data) {
      const par: GeoLocation = new GeoLocation();
      par.latitude = res.data[count].lat;
      par.longitude = res.data[count].lon;
      par.altitude = res.data[count].alt;
      par.timestamp = res.data[count].ts;
      par.accuracy = res.data[count].acc;
      par.speed = res.data[count].spe;
      geoLocationList.push(par);
      count++;
    }

    const rta: GeoLocationResponse = {
      GeoLocationList: geoLocationList,
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
