import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AddressInfo } from '@entities';
import { PackageService } from '@requests';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
@Injectable({
  providedIn: 'root',
})
export class StatepackageresolverService implements Resolve<Array<AddressInfo>> {
  constructor(private packageService: PackageService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<AddressInfo>> {
    const navigation = this.router.getCurrentNavigation();
    const stater = navigation.extras.state as {
      activityId: string;
      customerId: string;
    };
    return this.packageService
      .ActivityDetails({ activityId: stater.activityId, customerId: stater.customerId })
      .map((act: any) => {
        return act;
      })
      .catch((error) => {
        return Observable.of(null);
      });
  }
}
