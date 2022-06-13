import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core';
import { environment } from '@env/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { RegistryModule } from './registry/registry.module';
import { PruebasModule } from './tools/pruebas/pruebas.module';
import { AppComponent } from './app.component';

import { PackageModule } from './package/package.module';
import { CustomerModule } from './customer/customer.module';

import { DemoMaterialModule } from '@app/Entities/material-module';
import { PruebaautocompletedModule } from './pruebaautocompleted/pruebaautocompleted.module';
import { PruebaadminaddressModule } from './pruebaadminaddress/pruebaadminaddress.module';
import { PruebasgooglemapsModule } from './pruebasgooglemaps/pruebasgooglemaps.module';
import { PruebacamaraModule } from './pruebacamara/pruebacamara.module';
import { PruebarastreoModule } from './pruebarastreo/pruebarastreo.module';
import { PruebapanelModule } from './pruebapanel/pruebapanel.module';
import { PaymentsModule } from './payments/payments.module';
import { InfopageModule } from './infopage/infopage.module';
import { PlansModule } from './plans/plans.module';

//International phone library this 3 elements

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0RifCjCeMNKZxznQjqPr_m99QtAc4CQA',
    }),
    NgbModule,
    DemoMaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    RegistryModule,
    PaymentsModule,
    CustomerModule,
    PackageModule,
    ReactiveFormsModule,
    PruebacamaraModule,
    PruebasgooglemapsModule,
    PruebarastreoModule,
    PruebasModule,
    PruebaautocompletedModule,
    PruebaadminaddressModule,
    PruebapanelModule,
    InfopageModule,
    PlansModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
