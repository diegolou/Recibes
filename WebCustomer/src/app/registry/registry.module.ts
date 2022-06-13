import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxMaskModule } from 'ngx-mask';

import { RegistryRoutingModule } from './registry-routing.module';
import { RegistryComponent } from './registry.component';
import { I18nModule } from '@app/i18n';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '@shared';

// import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';

// export const options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [RegistryComponent],
  imports: [
    CommonModule,
    RegistryRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    FormsModule,
    I18nModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    SharedModule,
  ],
})
export class RegistryModule {}
