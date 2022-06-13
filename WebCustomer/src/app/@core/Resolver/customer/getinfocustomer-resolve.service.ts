import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersService } from '@requests';
import { CredentialsService } from '@app/auth';
import { InfoCustomer } from '@entities';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root',
})
export class GetinfocustomerResolveService implements Resolve<Array<InfoCustomer>> {
  constructor(
    private userServices: UsersService,
    private router: Router,
    private credentialsService: CredentialsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<InfoCustomer>> {
    return (
      this.userServices
        .GetCustomerInfo({ customerId: this.userId, profile: 'customer' })
        // .getPametersByType('IdType')
        .map((act: any) => {
          return act;
        })
        .catch((error) => {
          return Observable.of(null);
        })
    );
  }
  get userId(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.userid : null;
  }
}
