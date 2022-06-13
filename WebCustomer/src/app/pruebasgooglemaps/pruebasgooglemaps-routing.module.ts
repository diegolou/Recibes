import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebasgooglemapsComponent } from './pruebasgooglemaps.component';
import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/pruebasgoolgemaps', pathMatch: 'full' },
    { path: 'pruebasgoolgemaps', component: PruebasgooglemapsComponent, data: { title: extract('pruebasgoolgemaps') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebasgooglemapsRoutingModule {}
