import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { PruebasgooglemapsRoutingModule } from './pruebasgooglemaps-routing.module';
import { PruebasgooglemapsComponent } from './pruebasgooglemaps.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
// import { google } from '@agm/core/services/google-maps-types';
@NgModule({
  declarations: [PruebasgooglemapsComponent],
  imports: [
    CommonModule,
    PruebasgooglemapsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0RifCjCeMNKZxznQjqPr_m99QtAc4CQA',
    }),
    GooglePlaceModule,
  ],
})
export class PruebasgooglemapsModule {}
