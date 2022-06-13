import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebarastreoComponent } from './pruebarastreo.component';
import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/pruebarastreo', pathMatch: 'full' },
    { path: 'pruebarastreo', component: PruebarastreoComponent, data: { title: extract('pruebarastreo') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebarastreoRoutingModule {}
