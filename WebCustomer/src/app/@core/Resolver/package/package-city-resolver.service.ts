import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ActiveCity } from '@entities';
import { ParametersService, ParameterResponse } from '@requests';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
@Injectable({
  providedIn: 'root',
})
export class PackageCityResolverService implements Resolve<Array<ActiveCity>> {
  constructor(private param: ParametersService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<ActiveCity>> {
    return this.param
      .getActiveCities('COL')
      .map((act: any) => {
        return act;
      })
      .catch((error) => {
        return Observable.of(null);
      });
  }
}
