import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials, CredentialsService } from './credentials.service';
import { CryptoService } from '@core';
import { environment } from '@env/environment';
import { String } from 'typescript-string-operations';
export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private urlService = environment.serviceServerUrl; //'https://localhost:44379';
  private urlAuthenticateUser = this.urlService + '/api/Security/AuthenticateUser';

  constructor(
    private credentialsService: CredentialsService,
    private http: HttpClient,
    private cryptoServices: CryptoService
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return (
      this.http
        .post(
          this.urlAuthenticateUser,
          JSON.stringify(this.SetAuthenticateUserValueJson(context.username, context.password)),
          // return this.http.get(this.urlAuthenticateUser,
          httpOptions
        )
        .map((res) => {
          const rta = this.extractDataObservable(res);
          this.credentialsService.setCredentials(rta, context.remember);
          return rta;
        })
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleErrorObservable)
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
  private SetAuthenticateUserValueJson(username: any, password: any) {
    const x = {
      origin: 'customer',
      email: username,
      password: this.cryptoServices.encrypt(password, environment.cryptoKey),
    };
    return x;
  }
  private extractDataObservable(res: any) {
    if (res.codeResponse !== 200) {
      throw new Error(res.message);
    }

    const info: Credentials = {
      userid: res.data[0].userInfo.email,
      username: '',
      token: res.data[0].userInfo.password,
      usernamedescrip: String.Format(
        '{0} {1}',
        res.data[0].userInfo.firstName != 'N/A' ? res.data[0].userInfo.firstName : '',
        // res.data[0].userInfo.middleName,
        res.data[0].userInfo.lastName != 'N/A' ? res.data[0].userInfo.lastName : ''
      ),
      profile: res.data[0].userInfo.profile,
      Status: res.data[0].userInfo.status,
    };

    //   token: '123456',
    return info;
  }
  private handleErrorObservable(error: any): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console

    console.error(error);
    return Observable.throw(error.message || 'Server error');
  }
}
