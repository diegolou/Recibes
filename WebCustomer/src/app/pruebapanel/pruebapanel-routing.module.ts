import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { PruebapanelComponent } from './pruebapanel.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/pruebapanel', pathMatch: 'full' },
    { path: 'pruebapanel', component: PruebapanelComponent, data: { title: extract('pruebapanel') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebapanelRoutingModule {}
