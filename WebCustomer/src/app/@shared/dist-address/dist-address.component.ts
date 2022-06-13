import { Component, OnInit, Input, ViewChild, Output, OnChanges, SimpleChanges } from '@angular/core';
import { PacAddress, DistanceTimeTotalInfo, DistanceTimeInfo } from '@entities';

import { OdistanceService } from '@core';
@Component({
  selector: 'app-dist-address',
  templateUrl: './dist-address.component.html',
  styleUrls: ['./dist-address.component.scss'],
})
export class DistAddressComponent implements OnInit {
  // @ViewChild('googleMap') gmapElement: any;
  map: google.maps.Map;
  distancia: number;
  _addresses: Array<PacAddress> = new Array<PacAddress>();
  // @Input() addresses: Array<PacAddress>;

  @Input()
  get addresses(): Array<PacAddress> {
    return this._addresses;
  }
  set addresses(lista: Array<PacAddress>) {
    this._addresses = lista;
    this.distancia = this.Distancia();
  }
  constructor(private obserices: OdistanceService) {}

  ngOnInit(): void {}

  Distancia(): number {
    let roaddistance: number = 0;
    if (this._addresses != null) {
      for (let i = 1; i < this._addresses.length; i++) {
        let dis =
          roaddistance +
          google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(this._addresses[i - 1].lat, this._addresses[i - 1].lng),
            new google.maps.LatLng(this._addresses[i].lat, this._addresses[i].lng)
          );
      }
    }
    return roaddistance;
  }

  public Distanciap(addresses: Array<PacAddress>, sistransport: string): number {
    this._addresses = addresses;
    let roaddistance: number = 0;
    if (addresses != null) {
      this.obserices.getDistance(addresses, sistransport).then((result: any) => {
        // Aqui es donde debe hacer los Cambios.
        // result.results.totalDistance : Total de la distancia.
        // result.results.totalDuration : Total Duración recorrido.
        // result.results.detail[].distance : distancia recorrido.
        // result.results.detail[].duration : duracion recorrido.
        alert(result.results.totalDistance);

        this.distancia = result.results.totalDistance;
      });
    }

    return this.distancia;
  }
}
