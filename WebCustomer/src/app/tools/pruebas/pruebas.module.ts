import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { PruebasRoutingModule } from './pruebas-routing.module';
import { PruebasComponent } from './pruebas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from '@shared';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { TipoServiciosComponent } from '@app/tipo-servicios/tipo-servicios.component';
// import { MediosTransporteComponent } from '@app/medios-transporte/medios-transporte.component';
import { DemoMaterialModule } from '@app/Entities/material-module';
import { MediosTransporteDetailComponent } from '@app/medios-transporte-detail/medios-transporte-detail.component';
import { MessagesComponent } from '@app/messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Pruebas1Component } from './pruebas1.component';

//import { DistAddressComponent } from '@app/dist-address/dist-address.component';
// import { PacPlanesComponent } from '@app/pac-planes/pac-planes.component';

@NgModule({
  declarations: [
    PruebasComponent,
    TipoServiciosComponent,
    // MediosTransporteComponent,
    MediosTransporteDetailComponent,
    MessagesComponent,
    Pruebas1Component,
    //DistAddressComponent,
    // PacPlanesComponent,
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    PruebasRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0RifCjCeMNKZxznQjqPr_m99QtAc4CQA',
    }),
    GooglePlaceModule,
  ],
})
export class PruebasModule {}
