import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { PruebaRoutingModule } from './prueba-routing.module';
import { PruebaComponent } from './prueba.component';

@NgModule({
  declarations: [PruebaComponent],
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, IonicModule, PruebaRoutingModule],
})
export class PruebaModule {}
