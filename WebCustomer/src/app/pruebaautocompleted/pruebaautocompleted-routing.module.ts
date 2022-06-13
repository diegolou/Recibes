import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/i18n';
import { PruebaautocompletedComponent } from './pruebaautocompleted.component';

const routes: Routes = [
  Shell.childRoutesNoAut([
    { path: '', redirectTo: '/pruebacomplate', pathMatch: 'full' },
    { path: 'pruebacomplate', component: PruebaautocompletedComponent, data: { title: extract('Home') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebaautocompletedRoutingModule {}
