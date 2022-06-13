import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Holiday } from '@entities';
import { ParametersService } from '@requests';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root',
})
export class HolidayResolverService implements Resolve<Array<Holiday>> {
  constructor(private param: ParametersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Holiday>> {
    return this.param
      .GetHoliday()
      .map((act: any) => {
        return act;
      })
      .catch((error) => {
        return Observable.of(null);
      });
  }
}
