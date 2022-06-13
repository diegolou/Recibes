import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { PackageRoutingModule } from './package-routing.module';
import { TrackpackageComponent } from './trackpackage.component';
import { SendpackageComponent } from './sendpackage.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SharedModule } from '@shared';
import { CoreModule } from '@core';
import { StatuspackagelistComponent } from './statuspackagelist.component';
import { StatepackageComponent } from './statepackage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DetailAddressComponent } from './detail-address.component';
import { DetailPackerComponent } from './detail-packer.component';
import { DetailStepComponent } from './detail-step.component';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CustomMatPaginatorIntl } from '@core';
import { StatuspackagecardComponent } from './statuspackagecard.component';

@NgModule({
  declarations: [
    TrackpackageComponent,
    SendpackageComponent,
    StatuspackagelistComponent,
    StatepackageComponent,
    DetailAddressComponent,
    DetailPackerComponent,
    DetailStepComponent,
    StatuspackagecardComponent,
  ],
  imports: [
    CommonModule,
    PackageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    GooglePlaceModule,
    SharedModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatStepperModule,
    MatIconModule,
    MatPaginatorModule,
    CoreModule,
    MatSortModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0RifCjCeMNKZxznQjqPr_m99QtAc4CQA',
    }),
  ],
  exports: [DetailAddressComponent, DetailPackerComponent, DetailStepComponent, StatuspackagecardComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    },
  ],
  entryComponents: [StatepackageComponent],
})
export class PackageModule {}
