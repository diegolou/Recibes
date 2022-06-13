import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParameterIdTypeResolverService, GetinfocustomerResolveService } from '@resolverobj';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { UpdateComponent } from './update.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'customer/update',
      component: UpdateComponent,
      data: { title: extract('Update') },
      resolve: { idtype: ParameterIdTypeResolverService, infocustomer: GetinfocustomerResolveService },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
