import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { PacAddress, DistanceTimeTotalInfo, DistanceTimeInfo } from '@entities';
import { DistAddressComponent } from '@shared';
import { time } from 'console';
import { OdistanceService, TarifaService } from '@core';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-pruebaadminaddress',
  templateUrl: './pruebaadminaddress.component.html',
  styleUrls: ['./pruebaadminaddress.component.scss'],
})
export class PruebaadminaddressComponent implements OnInit {
  fechaprueba: Date;
  lista: Array<PacAddress> = new Array<PacAddress>();
  resultDist: DistanceTimeTotalInfo = new DistanceTimeTotalInfo();
  @ViewChild(DistAddressComponent) hijo: DistAddressComponent;
  constructor(private ser: OdistanceService, private tarifa: TarifaService) {}

  distrecorrida: number = 0;
  tiemporecorrido: number = 0;

  ngOnInit(): void {}

  change(event: Array<PacAddress>) {
    this.lista = event;
    // A qui se debe adicionar los tipos de servicio
    this.hijo.Distanciap(event, 'BICYCLING');
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   // changes.prop contains the old and the new value...
  //   for (let propName in changes) {
  //     let change = changes[propName];
  //     this.lista = changes[propName].currentValue;
  //   }
  //
  //   this.change(this.lista);
  //   if (this.lista.length > 1) {
  //     this.getDistancia1('BICYCLING');
  //   }
  // }
  getDistancia1(tmode: string) {
    this.ser.getDistance(this.lista, tmode).then((result: any) => {
      alert(result);
      this.resultDist = result.results;
      tmode;
    });
  }

  public getDistance(origen: string[], destino: string[], sistransport: string) {
    const service = new google.maps.DistanceMatrixService();
    var tvmode: any;
    switch (sistransport) {
      case 'BICYCLING': {
        tvmode = google.maps.TravelMode.BICYCLING;
        break;
      }
      default: {
        tvmode = google.maps.TravelMode.DRIVING;
        break;
      } //
    }
    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: origen,
          destinations: destino,
          travelMode: tvmode,
        },
        (response, status) => {
          if (status === 'OK') {
            let count = 0;
            let distance = 0;

            let results = new DistanceTimeTotalInfo();
            results.totalDistance = 0;
            results.totalDuration = 0;
            results.detail = new Array<DistanceTimeInfo>();
            response.rows.forEach((r) => {
              results.totalDistance += r.elements[count].distance.value;
              results.totalDuration += r.elements[count].duration.value;
              const result = new DistanceTimeInfo();
              result.distance = r.elements[count].distance.value;
              result.duration = r.elements[count].duration.value;
              results.detail.push(result);
              count++;
            });
            resolve({ distance: results });
          } else {
            reject(new Error('Not OK'));
          }
        }
      );
    });
  }
  validarfecha() {
    alert(this.tarifa.getHolidays(new Date(this.fechaprueba + ' 00:00:00'), 'COL'));
  }
}
