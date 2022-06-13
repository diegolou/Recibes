import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { PruebacamaraComponent } from './pruebacamara.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/pruebacamara', pathMatch: 'full' },
    { path: 'pruebacamara', component: PruebacamaraComponent, data: { title: extract('PruebaCamara') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebacamaraRoutingModule {}
