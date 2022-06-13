import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CustomerRoutingModule } from './customer-routing.module';
import { UpdateComponent } from './update.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '@shared';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';

@NgModule({
  declarations: [UpdateComponent, UpdateInfoComponent, UpdatePassComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
  ],
})
export class CustomerModule {}
