import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import * as _moment from 'moment';
import { ServiceResponse } from '../CommonRequest';

/**
 *
 *
 * @export
 * @interface SubmitRequest
 */
export interface SubmitRequest {
  activityId: string;
  reference: string;
  paymentId: string;
  paymentState: string;
  paymentValue: number;
  otherInfo: string;
}

/**
 *
 *
 * @export
 * @interface ProcessPaymentResponse
 */
export interface ProcessPaymentResponse {
  Response: string;
  ActivityId: string;
}
@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private urlService = environment.serviceServerUrl;
  private submitPayment = this.urlService + '/api/Payment/SubmitPayment';
  private processPayment = this.urlService + '/api/Payment/ProcessPayment';
  constructor(private http: HttpClient) {}

  SubmitPayment(context: SubmitRequest): Observable<ServiceResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const request = JSON.stringify(this.SetSubmitPaymentJson(context));
    return (
      this.http
        .post(this.submitPayment, request, httpOptions)
        .map((res) => {
          const rta = this.ExtractData(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }
  ProcessPayment(context: string): Observable<ProcessPaymentResponse> {
    debugger;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return (
      this.http
        .get(this.processPayment + '?paymentId=' + context, httpOptions)
        .map((res) => {
          const rta = this.ExtractDataProcessPayment(res);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }
  private SetSubmitPaymentJson(context: SubmitRequest) {
    const x = {
      activityId: context.activityId,
      reference: context.reference,
      paymentId: context.paymentId,
      paymentState: context.paymentState,
      paymentValue: context.paymentValue,
      otherInfo: context.otherInfo,
    };
    return x;
  }
  private ExtractData(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }

    const rta: ServiceResponse = { Message: res.message };
    return rta;
  }
  private ExtractDataProcessPayment(res: any): ProcessPaymentResponse {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }

    const rta: ProcessPaymentResponse = { Response: res.data[0].response, ActivityId: res.data[0].activityId };
    return rta;
  }
  private handleErrorObservable(error: any): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console

    console.error(error);
    return Observable.throw(error.message || 'Server error');
  }
}
