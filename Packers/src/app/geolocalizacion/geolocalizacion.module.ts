import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';

import { GeolocalizacionRoutingModule } from './geolocalizacion-routing.module';
import { GeolocalizacionComponent } from './geolocalizacion.component';

@NgModule({
  declarations: [GeolocalizacionComponent],
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, IonicModule, GeolocalizacionRoutingModule],
  providers: [BackgroundGeolocation, LocalNotifications, Geolocation],
})
export class GeolocalizacionModule {}
