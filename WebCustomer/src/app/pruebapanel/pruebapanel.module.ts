import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';

import { PruebapanelRoutingModule } from './pruebapanel-routing.module';
import { PruebapanelComponent } from './pruebapanel.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DatePipe } from '@angular/common';
import { PackageModule } from '@app/package/package.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxCurrencyModule, CurrencyMaskInputMode } from 'ngx-currency';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 0,
  prefix: '$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: 0,
  max: 100000000,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

// export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
//   align: "right",
//   allowNegative: true,
//   decimal: ",",
//   precision: 2,
//   prefix: "R$ ",
//   suffix: "",
//   thousands: "."
// };
@NgModule({
  declarations: [PruebapanelComponent],
  imports: [
    CommonModule,
    PruebapanelRoutingModule,
    TranslateModule,
    SharedModule,
    NgSelectModule,
    // NgbModule,
    // CurrencyMaskModule,
    PackageModule,
    ReactiveFormsModule,
    FormsModule,
    NgxIntlTelInputModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  providers: [DatePipe],
  // providers: [
  //   { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }]
})
export class PruebapanelModule {}
