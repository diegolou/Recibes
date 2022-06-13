import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { BrowserModule } from '@angular/platform-browser';

import { PruebacamaraRoutingModule } from './pruebacamara-routing.module';
import { PruebacamaraComponent } from './pruebacamara.component';

@NgModule({
  declarations: [PruebacamaraComponent],
  imports: [CommonModule, PruebacamaraRoutingModule, BrowserModule, FormsModule, WebcamModule],
})
export class PruebacamaraModule {}
