import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Logger } from '@core';

const log = new Logger('StatePackageGuard');
@Injectable({
  providedIn: 'root',
})
export class StatepackageGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const navigation = this.router.getCurrentNavigation();
    const stater = navigation.extras.state as {
      activityId: string;
      customerId: string;
    };
    if (stater) {
      log.debug('Paso el Guard');
      return true;
    } else {
      log.debug('No paso el Guard');
      this.router.navigate(['/home']);
      return false;
    }
    // return true;
  }
}
