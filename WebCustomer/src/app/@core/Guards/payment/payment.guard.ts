import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Logger } from '@core';

const log = new Logger('PaymentGuard');
@Injectable({
  providedIn: 'root',
})
export class PaymentGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const navigation = this.router.getCurrentNavigation();
    const stater = navigation.extras.state as {
      actitivyId: string;
      reference: string;
      paymentId: string;
      totalP: number;
      paymentT: string;
      taxes: number;
      origen: string;
    };
    if (stater) {
      log.debug('Payment Paso el Guard');
      return true;
    } else {
      log.debug('Payment No paso el Guard');
      this.router.navigate(['/home']);
      return false;
    }
    // return true;
  }
}
