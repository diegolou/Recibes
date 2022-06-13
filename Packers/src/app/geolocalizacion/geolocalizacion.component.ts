import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '@core';
import { CredentialsService } from '@app/auth/credentials.service';
import { finalize } from 'rxjs/operators';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents,
} from '@ionic-native/background-geolocation/ngx';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.scss'],
})
export class GeolocalizacionComponent implements OnInit {
  status: string;
  lat: number;
  lon: number;
  alt: number;
  // total:string ;

  constructor(
    public backgroundGeolocation: BackgroundGeolocation,
    private geo: GeolocationService,
    private credentials: CredentialsService
  ) // private localNotifications: LocalNotifications
  {
    // this.lat = 0 ;
    // this.lon = 0 ;
    // this.getGeolocation()
    this.status = 'Servicio Detenido';
  }

  ngOnInit(): void {}

  startBackgroundGeolocation() {
    this.backgroundGeolocation.isLocationEnabled().then((rta) => {
      if (rta) {
        this.start();
      } else {
        this.backgroundGeolocation.showLocationSettings();
      }
    });
  }

  start() {
    // const config: BackgroundGeolocationConfig = {
    //   desiredAccuracy: 10,
    //   stationaryRadius: 1,
    //   distanceFilter: 1,
    //   debug: true,
    //   stopOnTerminate: false,
    //   // Android only section
    //   locationProvider: 1, // https://github.com/mauron85/cordova-plugin-background-geolocation/blob/master/PROVIDERS.md
    //   startForeground: true,
    //   interval: 6000,
    //   fastestInterval: 5000,
    //   activitiesInterval: 10000,
    //   notificationTitle: 'Background tracking',
    //   notificationText: 'enabled',
    //   notificationIconColor: '#FEDD1E',
    //   notificationIconLarge: 'mappointer_large',
    //   notificationIconSmall: 'mappointer_small',
    // };
    // console.log('start');

    // // this.backgroundGeolocation
    // // .configure(config)
    // // .subscribe((location: BackgroundGeolocationResponse) => {
    // //   console.log(location);
    // //   this.logs.push(`${location.latitude},${location.longitude}`);
    // // });
    // this.backgroundGeolocation.configure(config).then(() => {
    //   this.backgroundGeolocation
    //     .on(BackgroundGeolocationEvents.location)
    //     .subscribe((location: BackgroundGeolocationResponse) => {
    //       console.log(location);
    //       this.logs.push(`${location.latitude},${location.longitude}`);
    //       // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
    //       // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
    //       // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
    //       this.backgroundGeolocation.finish(); // FOR IOS ONLY
    //     });
    // });
    // alert('Entro');
    this.status = 'Servicio Iniciado';
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false, //  Esto hace que el dispositivo emita sonidos cuando lanza un evento de localización
      stopOnTerminate: false, // Si pones este en verdadero, la aplicación dejará de trackear la localización cuando la app se haya cerrado.
      //Estas solo están disponibles para Android
      locationProvider: 1, //Será el proveedor de localización. Gps, Wifi, Gms, etc...
      startForeground: true,
      interval: 6000, //El intervalo en el que se comprueba la localización.
      fastestInterval: 5000, //Este para cuando está en movimiento.
      activitiesInterval: 10000, //Este es para cuando está realizando alguna actividad con el dispositivo.
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      notificationIconColor: '#FEDD1E',
      notificationIconLarge: 'mappointer_large',
      notificationIconSmall: 'mappointer_small',
    };
    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          // alert("Entro por sergunda vez" );
          // debugger ;
          // alert(location);
          // this.logs.push(`${location.latitude},${location.longitude}`);
          const user = this.credentials.credentials.username;

          this.setGeoLocation(user, location.latitude, location.longitude);
          // Es muy importante llamar al método finish() en algún momento para que se le notifique al sistema que hemos terminado y que libere lo que tenga que liberar,
          // Si no se hace, la aplicación dará error por problemas de memoria.
          // this.backgroundGeolocation.finish(); // SOLO PARA IOS
          // const info = 'Latitud=' + location.latitude + ' longitud=' + location.longitude + ' Altitud=' + location.altitude ;
          // this.localNotifications.schedule({
          //   id: 1,
          //   text: info,
          //   sound: 'file://sound.mp3',
          //   data: { secret: 'key_data' }
          // });
        });
    });
    // start recording location
    this.backgroundGeolocation.start();
  }
  stopBackgroundGeolocation() {
    this.status = 'Servicio Detenido';
    this.backgroundGeolocation.stop();
  }
  getlocation() {
    this.backgroundGeolocation.getCurrentLocation().then((location) => {
      this.lat = location.latitude;
      this.lon = location.longitude;
      this.alt = location.altitude;
    });
  }
  setGeoLocation(idPacker: string, latitude: number, longitude: number) {
    debugger;
    this.geo
      .setGeoLocation('packer-' + idPacker, latitude, longitude)
      .pipe(
        finalize(() => {
          // alert('registro');
        })
      )
      .subscribe((rta: any) => {
        // alert('Subscribe');
      });
  }
}

// }
