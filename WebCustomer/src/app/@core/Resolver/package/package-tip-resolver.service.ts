import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Tips } from '@entities';
import { ParametersService } from '@requests';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
@Injectable({
  providedIn: 'root',
})
export class PackageTipResolverService implements Resolve<Array<Tips>> {
  constructor(private parameterService: ParametersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Tips>> {
    const navigation = this.router.getCurrentNavigation();
    return this.parameterService
      .getTips('COL')
      .map((act: any) => {
        return act;
      })
      .catch((error) => {
        return Observable.of(null);
      });
  }
}
