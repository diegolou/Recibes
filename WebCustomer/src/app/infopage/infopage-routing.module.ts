import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { InfopageComponent } from './infopage.component';
const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/infopage', pathMatch: 'full' },
    { path: 'infopage', component: InfopageComponent, data: { title: extract('infopage') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfopageRoutingModule {}
