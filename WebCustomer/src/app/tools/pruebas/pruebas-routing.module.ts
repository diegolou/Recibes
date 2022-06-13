import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { PruebasComponent } from './pruebas.component';
import { Pruebas1Component } from './pruebas1.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/tools/pruebas', pathMatch: 'full' },
    { path: 'tools/pruebas', component: PruebasComponent, data: { title: extract('Pruebas') } },
    { path: 'tools/pruebas1', component: Pruebas1Component, data: { title: extract('Pruebas1') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebasRoutingModule {}
