import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoaderComponent } from './loader/loader.component';
import { PacAddressComponent } from './pac-address/pac-address.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { CitydropdownlistComponent } from './citydropdownlist/citydropdownlist.component';
import { AdminaddressComponent } from './adminaddress/adminaddress.component';
import { DistAddressComponent } from './dist-address/dist-address.component';
import { TransportdropdownlistComponent } from './transportdropdownlist/transportdropdownlist.component';
// import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { DistanceinfoComponent } from './distanceinfo/distanceinfo.component';
import { CostdetailComponent } from './costdetail/costdetail.component';
import { TransactiondetailComponent } from './transactiondetail/transactiondetail.component';
import { NgxCurrencyModule, CurrencyMaskInputMode } from 'ngx-currency';
// import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { PacAddressligthComponent } from './pac-addressligth/pac-addressligth.component';
import { PacPhoneComponent } from './pac-phone/pac-phone.component';
import { TypeofpersonComponent } from './typeofperson/typeofperson.component';
import { IdpersonComponent } from './idperson/idperson.component';
import { PacPlanesComponent } from './pac-planes/pac-planes.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 0,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: 0,
  max: 100000000,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};
// export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
//   align: 'right',
//   allowNegative: true,
//   decimal: '.',
//   precision: 0,
//   prefix: '$ ',
//   suffix: '',
//   thousands: ',',
// };
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    GooglePlaceModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    // CurrencyMaskModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    LoaderComponent,
    PacAddressComponent,
    CitydropdownlistComponent,
    AdminaddressComponent,
    DistAddressComponent,
    TransportdropdownlistComponent,
    DistanceinfoComponent,
    CostdetailComponent,
    TransactiondetailComponent,
    PacAddressligthComponent,
    PacPhoneComponent,
    TypeofpersonComponent,
    IdpersonComponent,
    PacPlanesComponent,
  ],
  exports: [
    LoaderComponent,
    PacAddressComponent,
    CitydropdownlistComponent,
    AdminaddressComponent,
    DistAddressComponent,
    TransportdropdownlistComponent,
    DistanceinfoComponent,
    CostdetailComponent,
    TransactiondetailComponent,
    PacAddressligthComponent,
    PacPhoneComponent,
    TypeofpersonComponent,
    IdpersonComponent,
    PacPlanesComponent,
  ],
  // providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
  providers: [],
})
export class SharedModule {}
