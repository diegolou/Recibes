import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AddressInfo, ActivityDetail, PaymentReq, PaymentDetail } from '@entities';
import * as _moment from 'moment';
import { PackageStatus } from '@entities';
import { ServiceResponse } from '../CommonRequest';

/**
 * Interface que tetorna el estado del envio de los paquetes.
 *
 * @export
 * @interface SendPaymentResponse
 */
export interface SendPaymentResponse {
  antivityId: string;
  reference: string;
  paymentId: string;
  totalP: number;
  paymentT: string;
  taxes: number;
  origen: string;
}
/**
 *
 *
 * @export
 * @interface SendPackageRequest
 */
export interface SendPackageRequest {
  CustomerId: string;
  AddressesInfo: AddressInfo[];
  Remark: string;
  totalDistance: number;
  paymentId: string;
  payment: PaymentReq;
  paymentDetail: PaymentDetail;
}
/**
 *
 *
 * @export
 * @interface PackageStatusRequest
 */
export interface PackageStatusRequest {
  customerId: string;
  filterType: number;
  bDateFilter: Date;
  eDateFilter: Date;
}
/**
 *
 *
 * @export
 * @interface ActivityDetailsRequest
 */
export interface ActivityDetailsRequest {
  activityId: string;
  customerId: string;
}
@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private urlService = environment.serviceServerUrl; //'http://localhost:52633';
  private GetCustPAckStatus = this.urlService + '/api/Packages/GetCustomerPackageStatus';
  private ActivityDetrail = this.urlService + '/api/Packages/GetActivityDetail';
  private SendPackage = this.urlService + '/api/Packages/SendPackage';

  constructor(private http: HttpClient) {}
  /**
   *
   *
   * @param {SendPackageRequest} context
   * @return {*}  {Observable<ServiceResponse>}
   * @memberof PackageService
   */
  sendPackage(context: SendPackageRequest): Observable<SendPaymentResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const request = JSON.stringify(this.SetGetSendPackageJson(context));
    return (
      this.http
        .post(
          this.SendPackage,
          request,
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          debugger;
          const rta = this.extractDataSendPackage(res);
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
   * @param {SendPackageRequest} context
   * @return {*}
   * @memberof PackageService
   */
  private SetGetSendPackageJson(context: SendPackageRequest) {
    const x = {
      customerId: context.CustomerId,
      addressesInfo: context.AddressesInfo,
      remark: context.Remark,
      sendDate: _moment().utc(),
      payment: context.payment,
      paymentId: context.paymentId,
      paymentDetail: context.paymentDetail,
      totalDistance: context.totalDistance,
    };
    return x;
  }
  private extractDataSendPackage(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }

    // const rta: ServiceResponse = { Message: res.message };
    // return rta;
    return res.data;
  }
  /**
   *
   *
   * @param {PackageStatusRequest} context
   * @return {*}  {Observable<PackageStatus>}
   * @memberof PackageService
   */
  PackageStatus(context: PackageStatusRequest): Observable<PackageStatus> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    debugger;
    return (
      this.http
        .post(
          this.GetCustPAckStatus,
          JSON.stringify(context),
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          const rta = this.extractDataPackageStatus(res);
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
   * @memberof PackageService
   */
  private extractDataPackageStatus(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }
    return res.data;
  }
  /**
   *
   *
   * @param {ActivityDetailsRequest} context
   * @return {*}  {Observable<ActivityDetail>}
   * @memberof PackageService
   */
  ActivityDetails(context: ActivityDetailsRequest): Observable<ActivityDetail> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return (
      this.http
        .post(
          this.ActivityDetrail,
          JSON.stringify(context),
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          const rta = this.extractDataActivityDetail(res);
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
   * @memberof PackageService
   */
  private extractDataActivityDetail(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }
    const actdet: ActivityDetail = new ActivityDetail();
    actdet.activityId = res.data[0].activityID;
    actdet.addressInfoList = res.data[0].addressInfoList;
    actdet.packer = res.data[0].packer;
    actdet.createDate = res.data[0].createDate;
    actdet.packerAssigDate = res.data[0].packerAssigDate;
    return actdet;
  }
  private handleErrorObservable(error: any): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console

    console.error(error);
    return Observable.throw(error.message || 'Server error');
  }
}
