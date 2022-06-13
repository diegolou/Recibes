import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PruebaadminaddressRoutingModule } from './pruebaadminaddress-routing.module';
import { PruebaadminaddressComponent } from './pruebaadminaddress.component';
// import { DistAddressComponent } from '@app/dist-address/dist-address.component';
@NgModule({
  declarations: [PruebaadminaddressComponent],
  imports: [CommonModule, PruebaadminaddressRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class PruebaadminaddressModule {}
