import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { PruebaautocompletedRoutingModule } from './pruebaautocompleted-routing.module';
import { PruebaautocompletedComponent } from './pruebaautocompleted.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [PruebaautocompletedComponent],
  imports: [
    CommonModule,
    PruebaautocompletedRoutingModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0RifCjCeMNKZxznQjqPr_m99QtAc4CQA',
    }),
  ],
})
export class PruebaautocompletedModule {}
