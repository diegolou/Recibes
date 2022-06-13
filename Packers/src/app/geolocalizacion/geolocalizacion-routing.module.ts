import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { GeolocalizacionComponent } from './geolocalizacion.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/geolocalizacion', pathMatch: 'full' },
    { path: 'geolocalizacion', component: GeolocalizacionComponent, data: { title: extract('geolocalizacion') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeolocalizacionRoutingModule {}
