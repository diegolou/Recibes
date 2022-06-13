import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';

import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from '../plans/plans.component';

@NgModule({
  declarations: [PlansComponent],
  imports: [CommonModule, PlansRoutingModule, SharedModule],
})
export class PlansModule {}
