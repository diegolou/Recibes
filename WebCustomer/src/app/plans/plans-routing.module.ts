import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { PlansComponent } from './plans.component';
import { PlansGetPlansResolverService } from '@resolverobj';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'plans',
      component: PlansComponent,
      data: { title: extract('Plans') },
      resolve: { planstype: PlansGetPlansResolverService },
    },
    // {
    //   path: 'package/send',
    //   component: SendpackageComponent,
    //   data: { title: extract('Send') },
    //   resolve: { cityList: PackageCityResolverService, packageType: PackageTypeResolverService },
    // },
    // {
    //   path: 'package/activitydetail',
    //   component: StatepackageComponent,
    //   data: { title: extract('Activity') },
    //   canActivate: [StatepackageGuard],
    //   resolve: { ActivityDetail: StatepackageresolverService },
    // },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule {}
