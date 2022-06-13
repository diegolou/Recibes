import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PacPlanes } from '@entities';
import { PlansService } from '@requests';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root',
})
export class PlansGetPlansResolverService implements Resolve<Array<PacPlanes>> {
  constructor(private plansService: PlansService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<PacPlanes>> {
    return this.plansService
      .getPlans()
      .map((act: any) => {
        return act;
      })
      .catch((error: any) => {
        return Observable.of(null);
      });
  }
}
