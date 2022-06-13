import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { from } from 'rxjs';
import { PaymenthistoryComponent } from './paymenthistory.component';
import { PaymentComponent } from './payment.component';
import { PaymentprocessComponent } from './paymentprocess.component';
import { PaymentGuard, PaymentprocessGuard } from '@guardsobj';
import { PaymentresultComponent } from './paymentresult.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'payments/history',
      component: PaymenthistoryComponent,
      data: { title: extract('History') },
    },
    {
      path: 'payments/payment',
      component: PaymentComponent,
      data: { title: extract('Payment') },
      canActivate: [PaymentGuard],
    },
    {
      path: 'payments/paymentprocess',
      component: PaymentprocessComponent,
      data: { title: extract('Payment') },
      canActivate: [PaymentprocessGuard],
    },
    {
      path: 'payments/paymentresult',
      component: PaymentresultComponent,
      data: { title: extract('payment') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsRoutingModule {}
