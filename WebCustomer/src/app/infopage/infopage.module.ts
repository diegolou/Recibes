import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InfopageRoutingModule } from './infopage-routing.module';
import { InfopageComponent } from './infopage.component';

@NgModule({
  declarations: [InfopageComponent],
  imports: [CommonModule, InfopageRoutingModule, TranslateModule],
})
export class InfopageModule {}
