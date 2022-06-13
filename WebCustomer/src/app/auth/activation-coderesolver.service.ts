import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '@requests';
import { ActivationCode } from '@entities';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root',
})
export class ActivationCoderesolverService implements Resolve<ActivationCode> {
  constructor(private security: SecurityService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ActivationCode> {
    const navigation = this.router.getCurrentNavigation();
    const stater = navigation.extras.state as {
      active: boolean;
      customerId: string;
      profile: string;
    };
    return this.security
      .ActivationCode({ customerId: stater.customerId, profile: stater.profile })
      .map((act) => {
        let rta = new ActivationCode();
        rta = { ActivationCode: act.activationCode, CustomerId: act.customerId, Profile: act.profile };
        return rta;
      })
      .catch((error) => {
        return Observable.of(null);
      });
  }
}
