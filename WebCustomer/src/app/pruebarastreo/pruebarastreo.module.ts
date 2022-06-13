import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';

import { PruebarastreoRoutingModule } from './pruebarastreo-routing.module';
import { PruebarastreoComponent } from './pruebarastreo.component';

@NgModule({
  declarations: [PruebarastreoComponent],
  imports: [
    CommonModule,
    PruebarastreoRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0RifCjCeMNKZxznQjqPr_m99QtAc4CQA',
    }),
  ],
})
export class PruebarastreoModule {}
