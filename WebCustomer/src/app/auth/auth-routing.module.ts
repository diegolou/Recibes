import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { LoginComponent } from './login.component';
import { ActivateComponent } from './activate.component';
import { ActivateGuard } from './activate.guard';
import { ActivationCoderesolverService } from './activation-coderesolver.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: extract('Login') } },
  {
    path: 'activate',
    component: ActivateComponent,
    data: { title: extract('Activate') },
    canActivate: [ActivateGuard],
    resolve: { actcode: ActivationCoderesolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
