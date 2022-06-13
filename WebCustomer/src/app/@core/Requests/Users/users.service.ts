import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { AddressInfoResponse } from '@entities';
import { Observable, of, Subject } from 'rxjs';
import { CryptoService } from '@core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
/**
 *
 *
 * @export
 * @interface CreateUserContext
 */
export interface CreateUserContext {
  idType: string;
  idNumber: number;
  firstName: string;
  lastName: string;
  mobile: number;
  eMail: string;
  profile: string;
  password: string;
  terms: boolean;
  reteFuente: boolean;
  reteIca: boolean;
  actaReteFuente: string;
  actaReteIca: string;
  company: boolean;
  countryCode: number;
  address: addressInfo;
}
/**
 *
 *
 * @export
 * @interface InfoCustomerRequest
 */
export interface InfoCustomerRequest {
  customerId: string;
  profile: string;
}
/**
 *
 *
 * @export
 * @interface UpdateCustomerRequest
 */
export interface UpdateCustomerRequest {
  idType: string;
  idNumber: number;
  firstName: string;
  lastName: string;
  profile: string;
  eMail: string;
  mobile: number;
  reteFuente: boolean;
  reteIca: boolean;
  actaReteFuente: string;
  actaReteIca: string;
  company: boolean;
  countryCode: number;
  addressesInfo: addressInfo;
}
/**
 *
 *
 * @export
 * @interface addressInfo
 */
export interface addressInfo {
  id: string;
  name: string;
  address: string;
  adnumber: string;
  country: string;
  state: string;
  city: string;
  details: string;
  instruccions: string;
  latitude: number;
  longitude: number;
  postalCode: string;
  type: string;
  formattedaddress: string;
}
/**
 *
 *
 * @export
 * @interface ServerResponse
 */
export interface ServerResponse {
  // Customize received credentials here
  message: any;
}
/**
 *
 *
 * @export
 * @interface infoCustomerResponse
 */
export interface infoCustomerResponse {
  idType: string;
  idNumber: number;
  profile: string;
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  mobile: number;
  retefuente: boolean;
  actaReteFuente: string;
  reteIca: boolean;
  actaReteIca: string;
  company: boolean;
  countryCode: number;
  addressInfoList: Array<AddressInfoResponse>;
}
/**
 *
 *
 * @export
 * @interface customerPlansResponse
 */
export interface customerPlansResponse {
  planId: string;
  planName: string;
  balance: number;
  currency: string;
}
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private urlService = environment.serviceServerUrl;
  private urlCreateUser = this.urlService + '/api/Customer/RegistryCustomer';
  private urlGetCustomerUser = this.urlService + '/api/Customer/GetCustomerInfo';
  private urlUpdateCustomerUser = this.urlService + '/api/Customer/UpdateCustomer';
  private urlGetCustomerPlan = this.urlService + '/api/Customer/GetCustomerPlans';

  constructor(private http: HttpClient, private cryptoService: CryptoService) {}

  Registry(context: CreateUserContext): Observable<ServerResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const request = JSON.stringify(
      this.SetCreateUserValueJson(
        context.idType,
        context.idNumber,
        context.firstName,
        context.lastName,
        context.profile,
        context.eMail,
        this.cryptoService.encrypt(context.password, environment.cryptoKey),
        context.mobile,
        context.address,
        context.terms,
        context.reteFuente,
        context.reteIca,
        context.actaReteFuente,
        context.actaReteIca,
        context.company,
        context.countryCode
      )
    );
    return (
      this.http
        .post(
          this.urlCreateUser,
          request,
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          const rta = this.ExtractMessageObservable(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.HandleErrorObservable)
    );
  }
  /**
   *
   *
   * @private
   * @param {string} idTypep
   * @param {number} idNumberp
   * @param {string} firstnamep
   * @param {string} lastnamep
   * @param {string} profilep
   * @param {string} emailp
   * @param {string} passwordp
   * @param {number} mobilep
   * @param {addressInfo} address
   * @param {boolean} termsp
   * @param {boolean} reteFuentep
   * @param {boolean} reteIcap
   * @param {string} actaReteFuentep
   * @param {string} actaReteIcap
   * @param {boolean} companyp
   * @param {number} countryCodep
   * @return {*}
   * @memberof UsersService
   */
  private SetCreateUserValueJson(
    idTypep: string,
    idNumberp: number,
    firstnamep: string,
    lastnamep: string,
    profilep: string,
    emailp: string,
    passwordp: string,
    mobilep: number,
    address: addressInfo,
    termsp: boolean,
    reteFuentep: boolean,
    reteIcap: boolean,
    actaReteFuentep: string,
    actaReteIcap: string,
    companyp: boolean,
    countryCodep: number
  ): any {
    const x = {
      idType: idTypep,
      idNumber: idNumberp,
      firstName: firstnamep,
      lastName: lastnamep,
      password: passwordp,
      profile: profilep,
      email: emailp,
      mobile: mobilep,
      addressesInfo: address,
      terms: termsp,
      reteFuente: reteFuentep,
      reteIca: reteIcap,
      actaReteFuente: actaReteFuentep,
      actaReteIca: actaReteIcap,
      company: companyp,
      countryCode: countryCodep,
    };
    return x;
  }
  private ExtractMessageObservable(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }

    const rta: ServerResponse = {
      message: res.data[0].message,
    };
    return rta;
  }
  /**
   *
   *
   * @param {UpdateCustomerRequest} context
   * @return {*}  {Observable<ServerResponse>}
   * @memberof UsersService
   */
  UpdateCustomer(context: UpdateCustomerRequest): Observable<ServerResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const request = JSON.stringify(
      this.SetUpdateValueValueJson(
        context.idType,
        context.idNumber,
        context.firstName,
        context.lastName,
        context.profile,
        context.eMail,
        context.mobile,
        context.reteFuente,
        context.reteIca,
        context.actaReteFuente,
        context.actaReteIca,
        context.company,
        context.countryCode,
        context.addressesInfo
      )
    );
    return (
      this.http
        .post(
          this.urlUpdateCustomerUser,
          request,
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          const rta = this.ExtractMessageObservable(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.HandleErrorObservable)
    );
  }
  /**
   *
   *
   * @private
   * @param {string} idTypep
   * @param {number} idNumberp
   * @param {string} firstNamep
   * @param {string} lastNamep
   * @param {string} profilep
   * @param {string} eMailp
   * @param {number} mobilep
   * @param {boolean} reteFuentep
   * @param {boolean} reteIcap
   * @param {string} actaReteFuentep
   * @param {string} actaReteIcap
   * @param {boolean} companyp
   * @param {number} countryCodep
   * @param {addressInfo} addressesInfop
   * @return {*}
   * @memberof UsersService
   */
  private SetUpdateValueValueJson(
    idTypep: string,
    idNumberp: number,
    firstNamep: string,
    lastNamep: string,
    profilep: string,
    eMailp: string,
    mobilep: number,
    reteFuentep: boolean,
    reteIcap: boolean,
    actaReteFuentep: string,
    actaReteIcap: string,
    companyp: boolean,
    countryCodep: number,
    addressesInfop: addressInfo
  ): any {
    const x = {
      idType: idTypep,
      idNumber: idNumberp,
      firstName: firstNamep,
      lastName: lastNamep,
      profile: profilep,
      eMail: eMailp,
      mobile: mobilep,
      reteFuente: reteFuentep,
      reteIca: reteIcap,
      actaReteFuente: actaReteFuentep,
      actaReteIca: actaReteIcap,
      company: companyp,
      countryCode: countryCodep,
      addressesInfo: addressesInfop,
    };
    return x;
  }
  /**
   *
   *
   * @param {InfoCustomerRequest} context
   * @return {*}  {Observable<infoCustomerResponse>}
   * @memberof UsersService
   */
  GetCustomerInfo(context: InfoCustomerRequest): Observable<Array<infoCustomerResponse>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const request = JSON.stringify(context);
    return (
      this.http
        .post(
          this.urlGetCustomerUser,
          request,
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          const rta = this.ExtractDataObservable(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.HandleErrorObservable)
    );
  }
  /**
   *
   *
   * @param {InfoCustomerRequest} context
   * @return {*}  {Observable<customerPlansResponse>}
   * @memberof UsersService
   */
  GetCustomerPlans(context: InfoCustomerRequest): Observable<customerPlansResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const request = JSON.stringify(context);
    return (
      this.http
        .post(
          this.urlGetCustomerUser,
          request,
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          const rta = this.ExtractDataObservableGetPlans(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.HandleErrorObservable)
    );
  }
  /**
   *
   *
   * @private
   * @param {*} res
   * @return {*}
   * @memberof UsersService
   */
  private ExtractDataObservable(res: any) {
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
   * @memberof UsersService
   */
  private HandleErrorObservable(error: any): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console

    console.error(error);
    return Observable.throw(error.message || 'Server error');
  }

  private ExtractDataObservableGetPlans(res: any): Array<customerPlansResponse> {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }
    let rta: Array<customerPlansResponse> = new Array<customerPlansResponse>();
    res.data.array.forEach((element: any) => {
      rta.push({
        planId: element.planId,
        planName: element.planName,
        balance: element.balance,
        currency: element.currency,
      });
    });
    return res.data;
  }
}
