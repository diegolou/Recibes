import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of, Subject } from 'rxjs';
import { CryptoService } from '@core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Country, State, City, Parameter, Holiday } from '@entities';

export interface CountriesResponse {
  Countries: Country[];
}

export interface StatesRespose {
  code: string;
  name: string;
  cCode: number;
  States: State[];
}

export interface CitiesRespose {
  country: string;
  code: string;
  name: string;
  Cities: City[];
}

export interface ActiveCitiesResponse {
  code: string;
  name: string;
  googleMapCP: string;
}

export interface TipsResponse {
  country: string;
  id: string;
  value: string;
}

export interface ParameterResponse {
  Parameters: Parameter[];
  // type: string;
  //     id: string;
  //     value: string;
  //     desc: string;
  //     active : boolean;
  //     imageFile: string;
  //     required : boolean;
}

export interface TransportTypeResponse {
  code: number;
  name: string;
  ServiceCode: number;
  type: string; //BICYCLING OR DRIVING
  tarifa_ini: number;
  tarife_sec: number;
  tarifa_mts: number;
  distancia_ini: number; //distancia max incluida en tarifa ini
  recargo_noc: number;
  recargo_fest: number;
  image: string;
  weightLimit: number;
  sizeLimit: string;
  distanceLimit: number;
}
@Injectable({
  providedIn: 'root',
})
export class ParametersService {
  private urlService = environment.serviceServerUrl; //'http://localhost:52633';
  private GetCountries = this.urlService + '/api/Parameters/GetCountries';
  private GetCountry = this.urlService + '/api/Parameters/GetCountry';
  private GetState = this.urlService + '/api/Parameters/GetState';
  private GetPameters = this.urlService + '/api/Parameters/GetParameters';
  private GetPametersByType = this.urlService + '/api/Parameters/GetParametersByType';
  private GetTransportType = this.urlService + '/api/Parameters/GetTransportType';
  private GetPackageType = this.urlService + '/api/Parameters/GetPackageType';
  private GetActiveCities = this.urlService + '/api/Parameters/GetActiveCities';
  private GetTips = this.urlService + '/api/Parameters/GetCountryTips';
  private getHoliday = this.urlService + '/api/Parameters/GetHolidays';
  constructor(private http: HttpClient) {}

  getCountries(): Observable<CountriesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .post(
          this.GetCountries,
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          const rta = this.extractDataCountryObservable(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }
  private extractDataCountryObservable(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }
    let countriesList: Country[] = new Array<Country>();
    let key,
      count = 0;
    for (key in res.data) {
      const par: Country = new Country();
      par.code = res.data[count].code;
      par.name = res.data[count].name;
      par.countryCode = res.data[count].cCode;
      countriesList.push(par);
      count++;
    }

    const rta: CountriesResponse = {
      Countries: countriesList,
    };
    return rta;
  }

  getCountry(code: string): Observable<StatesRespose> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .post(
          this.GetCountry,
          JSON.stringify(this.SetGetCountryValueJson(code)),
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          const rta = this.extractDataStateObservable(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }
  private extractDataStateObservable(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }

    let statesList: State[] = new Array<State>();
    let key,
      count = 0;
    for (key in res.data[0].states) {
      const par: State = new State();
      par.code = res.data[0].states[count].code;
      par.name = res.data[0].states[count].name;
      statesList.push(par);
      count++;
    }

    const rta: StatesRespose = {
      code: res.data[0].code,
      name: res.data[0].name,
      cCode: res.data[0].cCode,
      States: statesList,
    };
    return rta;
  }

  private SetGetCountryValueJson(code: string) {
    const x = {
      code: code,
    };
    return x;
  }

  getState(countryCode: string, stateCode: string): Observable<CitiesRespose> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .post(
          this.GetState,
          JSON.stringify(this.SetGetStateValueJson(countryCode, stateCode)),
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          const rta = this.extractDataCityObservable(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }
  private extractDataCityObservable(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }
    let statesList: City[] = new Array<City>();
    let key,
      count = 0;
    for (key in res.data[0].cities) {
      const par: City = new City();
      par.code = res.data[0].cities[count].code;
      par.name = res.data[0].cities[count].name;
      statesList.push(par);
      count++;
    }

    const rta: CitiesRespose = {
      code: res.data[0].code,
      name: res.data[0].name,
      country: res.data[0].country,
      Cities: statesList,
    };
    return rta;
  }

  private SetGetStateValueJson(countryCode: string, stateCode: string) {
    const x = {
      countryCode: countryCode,
      stateCode: stateCode,
    };
    return x;
  }

  getPameters(): Observable<ParameterResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .get(this.GetPameters, httpOptions)
        .map((res) => {
          const rta = this.extractDataParameterObservable(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }
  getPametersByType(code: string): Observable<ParameterResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .get(this.GetPametersByType + '?type=' + code, httpOptions)
        .map((res) => {
          const rta = this.extractDataParameterObservable(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }
  private extractDataParameterObservable(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }
    let parameterList: Parameter[] = new Array<Parameter>();
    let key,
      count = 0;
    for (key in res.data) {
      const par: Parameter = new Parameter();
      par.type = res.data[count].type;
      par.id = res.data[count].id;
      par.value = res.data[count].value;
      par.desc = res.data[count].desc;
      par.active = res.data[count].active;
      par.imageFile = res.data[count].imageFile;
      par.required = res.data[count].required;
      par.valueAdd = res.data[count].valueAdd;
      par.valueAdd2 = res.data[count].valueAdd2;
      parameterList.push(par);
      count++;
    }

    const rta: ParameterResponse = {
      Parameters: parameterList,
    };
    return rta;
  }

  getTransportType(): Observable<TransportTypeResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .get(this.GetTransportType, httpOptions)
        .map((res) => {
          const rta = this.extractDataDefault(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }
  getPackageType(): Observable<TransportTypeResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .get(this.GetPackageType, httpOptions)
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
   * @return {*}  {Observable<Array<Holiday>>}
   * @memberof ParametersService
   */
  GetHoliday(): Observable<Array<Holiday>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .get(this.getHoliday, httpOptions)
        .map((res) => {
          const rta = this.extractDataDefault(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }

  private extractDataDefault(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }
    return res.data;
  }
  /**
   *
   *
   * @param {string} code
   * @return {*}  {Observable<ActiveCitiesResponse>}
   * @memberof ParametersService
   */
  getActiveCities(code: string): Observable<ActiveCitiesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .post(this.GetActiveCities, JSON.stringify(this.SetGetCountryValueJson(code)), httpOptions)
        .map((res) => {
          const rta = this.extractDataDefault(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }

  getTips(code: string): Observable<TipsResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .get(this.GetTips + '?countryCode=' + code, httpOptions)
        .map((res) => {
          const rta = this.extractDataDefault(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }

  private handleErrorObservable(error: any): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console

    console.error(error);
    return Observable.throw(error.message || 'Server error');
  }
}
