import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/i18n';
import { PruebaadminaddressComponent } from './pruebaadminaddress.component';

const routes: Routes = [
  Shell.childRoutesNoAut([
    { path: '', redirectTo: '/pruebaadminaddress', pathMatch: 'full' },
    {
      path: 'pruebaadminaddress',
      component: PruebaadminaddressComponent,
      data: { title: extract('pruebaadminaddress') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebaadminaddressRoutingModule {}
