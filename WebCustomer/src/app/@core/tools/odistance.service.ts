import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { PacAddress, DistanceTimeTotalInfo, DistanceTimeInfo, Latlng } from '@entities';
import { state } from '@angular/animations';
/**
 *
 *
 * @export
 * @class OdistanceService
 */
@Injectable({
  providedIn: 'root',
})
export class OdistanceService {
  constructor() {}

  // public getDistance(info: Array<PacAddress>) {
  //   const origin = this.createMatrix(info, 'O');
  //   const dest = this.createMatrix(info, 'D');
  //   const service = new google.maps.DistanceMatrixService();

  // public getDistance(origen: string[], destino: string[]) {
  /**
   *
   *
   * @param {Array<PacAddress>} info
   * @param {string} sistransport
   * @return {*}
   * @memberof OdistanceService
   */
  public getDistance(info: Array<PacAddress>, sistransport: string) {
    const origin = this.createMatrix(info, 'O');
    const dest = this.createMatrix(info, 'D');
    var tvmode: any;
    switch (sistransport.toUpperCase()) {
      case 'BICYCLING': {
        tvmode = google.maps.TravelMode.BICYCLING;
        break;
      }
      case 'DRIVING': {
        tvmode = google.maps.TravelMode.DRIVING;
        break;
      } //
    }

    let A = this.isSameCountry(info);
    let B = this.isSameState(info);
    let C = this.isSameTown(info);
    let D = this.isSpecialTwon(info);

    const service = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: origin,
          destinations: dest,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === 'OK') {
            let count = 0;
            let distance = 0;
            let results = new DistanceTimeTotalInfo();
            results.totalDistance = 0;
            results.totalDuration = 0;
            results.detail = new Array<DistanceTimeInfo>();
            response.rows.forEach((r, index) => {
              results.totalDistance += r.elements[count].distance.value;
              results.totalDuration += r.elements[count].duration.value;
              const result = new DistanceTimeInfo();
              result.id = index + 1;
              result.distance = r.elements[count].distance.value;
              result.duration = r.elements[count].duration.value;
              results.detail.push(result);
              count++;
            });
            // aqui se valida si el ultimo Pacaddress en volver al origen
            const index = info.length - 1;
            if (info[index].id == '1' && index > 1) {
              const indexr = results.detail.length - 1;
              results.detail[indexr].id = 1;
            }
            resolve({ results });
          } else {
            reject(new Error('Not OK'));
          }
        }
      );
    });
  }

  /**
   *
   *
   * @private
   * @param {*} element
   * @param {number} index
   * @param {*} array
   * @memberof OdistanceService
   */
  private logArrayElements(element: any, index: number, array: any) {
    console.log('a[' + index + '] = ' + element);
  }
  /**
   *
   *
   * @private
   * @param {Array<PacAddress>} info
   * @param {string} type
   * @return {*}  {string[]}
   * @memberof OdistanceService
   */
  private createMatrix(info: Array<PacAddress>, type: string): string[] {
    let matrix: string[] = [];
    let count = 0;
    info.forEach((r) => {
      let aux = '';
      switch (type.toUpperCase()) {
        case 'O':
          if (count < info.length - 1) {
            aux = r.lat.toString() + ',' + r.lng.toString();
          }
          break;
        case 'D':
          if (count > 0) {
            aux = r.lat.toString() + ',' + r.lng.toString();
          }
          break;
        default:
          break;
      }
      count++;
      if (aux != '') {
        matrix.push(aux);
      }
    });
    return matrix;
  }

  /**
   *Función que se encarga de sacar el punto medio de las coordenadas
   *para poder centrar el mapa con respecto a las coordenadas ingresadas.
   *
   * @param {Array<PacAddress>} points
   * @return {*}  {Latlng}
   * @memberof OdistanceService
   */
  public getMiddlePoint(points: Array<PacAddress>): Latlng {
    let latlngmp: Latlng = new Latlng();
    if (points != null && points.length == 0) {
      return;
    } else if (points.length == 1) {
      latlngmp.lat = points[0].lat;
      latlngmp.lng = points[0].lng;
      // return latlngmp;
    } else if (points.length == 2) {
      if (points[0].valid && points[1].valid) {
        latlngmp = this.MiddlePoint(new Latlng(points[0].lat, points[0].lng), new Latlng(points[1].lat, points[1].lng));
      } else {
        if (points[0].valid) {
          latlngmp.lat = points[0].lat;
          latlngmp.lng = points[0].lng;
        }
        if (points[1].valid) {
          latlngmp.lat = points[1].lat;
          latlngmp.lng = points[1].lng;
        }
      }
    } else {
      const result = this.MaxMinPoints(points);
      latlngmp = this.MiddlePoint(result[0], result[1]);
    }
    return latlngmp;
  }
  /**
   * Función que se encarga de encontra los puntos mas extermos de las cordenadas ingresadas
   *
   * @param {Array<PacAddress>} points
   * @return {*}  {Array<Latlng>}
   * @memberof OdistanceService
   */
  private MaxMinPoints(points: Array<PacAddress>): Array<Latlng> {
    const result: Array<Latlng> = new Array<Latlng>();
    let latmin: number = 1000000;
    let latmax: number = -1000000;
    let lngmin: number = 1000000;
    let lngmax: number = -1000000;

    points.forEach((r) => {
      if (r.valid) {
        latmin = r.lat <= latmin ? r.lat : latmin;
        latmax = r.lat > latmax ? r.lat : latmax;
        lngmin = r.lng <= lngmin ? r.lng : lngmin;
        lngmax = r.lng > lngmax ? r.lng : lngmax;
      }
    });
    result.push(new Latlng(latmin, lngmin));
    result.push(new Latlng(latmax, lngmax));
    return result;
  }
  /**
   * Función que retorna el punto medio
   *
   * @param {Latlng} point1
   * @param {Latlng} point2
   * @return {*}  {Latlng}
   * @memberof OdistanceService
   */
  private MiddlePoint(point1: Latlng, point2: Latlng): Latlng {
    const result: Latlng = new Latlng();
    result.lat = (point1.lat + point2.lat) / 2;
    result.lng = (point1.lng + point2.lng) / 2;

    return result;
  }
  /**
   *
   *
   * @param {Array<PacAddress>} info
   * @return {*}
   * @memberof OdistanceService
   */
  public isSameCountry(info: Array<PacAddress>) {
    if (info.length > 1) {
      let j = 1;
      for (let i = 1; i < info.length; i++) {
        if (info[0].country === info[i].country) j++;
      }

      if (j === info.length) return true;
    }
    return false;
  }
  /**
   *
   *
   * @param {Array<PacAddress>} info
   * @return {*}
   * @memberof OdistanceService
   */
  public isSameTown(info: Array<PacAddress>) {
    if (info.length > 1) {
      let j = 1;
      for (let i = 1; i < info.length; i++) {
        if (info[0].city === info[i].city) j++;
      }

      if (j === info.length) return true;
    }
    return false;
  }
  /**
   *
   *
   * @param {Array<PacAddress>} info
   * @return {*}
   * @memberof OdistanceService
   */
  public isSameState(info: Array<PacAddress>) {
    if (info.length > 1) {
      let j = 1;
      for (let i = 1; i < info.length; i++) {
        if (info[0].state === info[i].state) j++;
      }

      if (j === info.length) return true;
    }
    return false;
  }
  /**
   *
   *
   * @param {Array<PacAddress>} info
   * @return {*}
   * @memberof OdistanceService
   */
  public isSpecialTwon(info: Array<PacAddress>) {
    if (info.length > 1) {
      let stown: string[] = [];
      let j = 1;
      for (let i = 1; i < info.length; i++) {
        if (info[0].state != info[i].state) {
          stown.push(info[i].state);
        }
      }
      for (let i = 0; i < stown.length; i++) {
        if (stown[0] === stown[i + 1]) j++;
      }
      if (j === stown.length) {
        switch (info[0].country) {
          case 'CO':
            if (info[0].state === 'Cundinamarca' || stown[0] === 'Cundinamarca') {
              if (info[0].state === 'Bogotá' || stown[0] === 'Bogotá') return true;
            }
            break;
        }
      }
    }
    return false;
  }
}
