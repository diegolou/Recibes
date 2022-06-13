import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Parameter } from '@entities';
import { ParametersService } from '@requests';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
@Injectable({
  providedIn: 'root',
})
export class ParameterIdTypeResolverService implements Resolve<Array<Parameter>> {
  constructor(private parameterService: ParametersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Parameter>> {
    const navigation = this.router.getCurrentNavigation();
    const stater = navigation.extras.state as {
      activityId: string;
      customerId: string;
    };
    return this.parameterService
      .getPametersByType('IdType')
      .map((act: any) => {
        return act;
      })
      .catch((error) => {
        return Observable.of(null);
      });
  }
}
