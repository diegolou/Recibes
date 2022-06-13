import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/i18n';
import { RegistryComponent } from './registry.component';

const routes: Routes = [{ path: 'registry', component: RegistryComponent, data: { title: extract('Registry') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistryRoutingModule {}
