import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentprocessGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // debugger;
    if (Object.keys(route.queryParams).length > 0) {
      if (route.queryParams.id && route.queryParams.env) {
        return true;
      }
    }
    this.router.navigate(['/home']);
    return false;
  }
}
