import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { SendpackageComponent } from './sendpackage.component';
import { TrackpackageComponent } from './trackpackage.component';
import { StatepackageComponent } from './statepackage.component';
import {
  PackageCityResolverService,
  HolidayResolverService,
  StatepackageresolverService,
  PackageTipResolverService,
} from '@resolverobj';
import { StatepackageGuard } from '@guardsobj';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'package/track', component: TrackpackageComponent, data: { title: extract('Track') } },
    {
      path: 'package/send',
      component: SendpackageComponent,
      data: { title: extract('Send') },
      resolve: {
        cityList: PackageCityResolverService,
        holidayList: HolidayResolverService,
        tipsList: PackageTipResolverService,
      },
    },
    {
      path: 'package/activitydetail',
      component: StatepackageComponent,
      data: { title: extract('Activity') },
      canActivate: [StatepackageGuard],
      resolve: { ActivityDetail: StatepackageresolverService },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule {}
