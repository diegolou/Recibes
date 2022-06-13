import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  NavigationEnd,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Logger } from '@core';

const log = new Logger('ActivateGuard');
@Injectable({
  providedIn: 'root',
})
export class ActivateGuard implements CanActivate {
  private previousUrl: string;
  private currentUrl: string;
  constructor(private router: Router) {}
  // Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const navigation = this.router.getCurrentNavigation();
    const stater = navigation.extras.state as {
      active: boolean;
      customerId: string;
    };
    if (stater) {
      log.info('Paso el Guard');
      return true;
    } else {
      log.info('No paso el Guard');
      this.router.navigate(['/home']);
      return false;
    }
    // return true;
  }
}
