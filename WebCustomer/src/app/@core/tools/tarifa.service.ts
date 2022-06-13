import { Injectable } from '@angular/core';
import { DistanceTimeTotalInfo, PackageInfo, PacPlanes, Rates, TarifaInfo, Holiday } from '@entities';
import { distinct } from 'rxjs/operators';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
import { inflate } from 'zlib';

export enum NEXT_DAY {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  NONE = 7,
}
@Injectable({
  providedIn: 'root',
})
export class TarifaService {
  constructor() {}

  EASTER_WEEK_HOLIDAYS = [
    { day: -3, daysToSum: NEXT_DAY.NONE, celebration: 'Jueves Santo' },
    { day: -2, daysToSum: NEXT_DAY.NONE, celebration: 'Viernes Santo' },
    { day: 39, daysToSum: NEXT_DAY.MONDAY, celebration: 'Ascensión del Señor' },
    { day: 60, daysToSum: NEXT_DAY.MONDAY, celebration: 'Corphus Christi' },
    { day: 68, daysToSum: NEXT_DAY.MONDAY, celebration: 'Sagrado Corazón de Jesús' },
  ];

  HOLIDAYS = [
    { day: '01-01', daysToSum: NEXT_DAY.NONE, celebration: 'Año Nuevo' },
    { day: '05-01', daysToSum: NEXT_DAY.NONE, celebration: 'Día del Trabajo' },
    { day: '07-20', daysToSum: NEXT_DAY.NONE, celebration: 'Día de la Independencia' },
    { day: '08-07', daysToSum: NEXT_DAY.NONE, celebration: 'Batalla de Boyacá' },
    { day: '12-08', daysToSum: NEXT_DAY.NONE, celebration: 'Día de la Inmaculada Concepción' },
    { day: '12-25', daysToSum: NEXT_DAY.NONE, celebration: 'Día de Navidad' },
    { day: '01-06', daysToSum: NEXT_DAY.MONDAY, celebration: 'Día de los Reyes Magos' },
    { day: '03-19', daysToSum: NEXT_DAY.MONDAY, celebration: 'Día de San José' },
    { day: '06-29', daysToSum: NEXT_DAY.MONDAY, celebration: 'San Pedro y San Pablo' },
    { day: '08-15', daysToSum: NEXT_DAY.MONDAY, celebration: 'La Asunción de la Virgen' },
    { day: '10-12', daysToSum: NEXT_DAY.MONDAY, celebration: 'Día de la Raza' },
    { day: '11-01', daysToSum: NEXT_DAY.MONDAY, celebration: 'Todos los Santos' },
    { day: '11-11', daysToSum: NEXT_DAY.MONDAY, celebration: 'Independencia de Cartagena' },
  ];
  /**
   *
   *
   * @param {DistanceTimeTotalInfo} Distance
   * @param {PackageInfo} MdTransporte
   * @param {Array<Holiday>} holiday
   * @param {PacPlanes} plan
   * @param {Date} fecha
   * @return {*}  {TarifaInfo}
   * @memberof TarifaService
   */
  public getTarifa(
    Distance: DistanceTimeTotalInfo,
    MdTransporte: PackageInfo,
    holiday: Array<Holiday>,
    plan: PacPlanes,
    fecha: Date
  ): TarifaInfo {
    // debugger;
    let tarifa = new TarifaInfo();
    const rateInfo = MdTransporte.rateValueByCity.find((x) => x.tp_Priority == 1);
    // let tarifa: number = MdTransporte.tarifa_ini + (1 - plan.descuento);
    // tarifa.valorTotal = rate.tarifa_ini - plan.descuento;
    tarifa.tarifaBase = rateInfo.valueDist;
    tarifa.valorTotal = rateInfo.valueDist - plan.descuento;
    tarifa.descuentos = plan.descuento;
    tarifa.recargofestivo = 0;
    tarifa.recargoNocturno = 0;
    if (!this.serchNormalDay(fecha)) {
      tarifa.valorTotal = tarifa.valorTotal + tarifa.recargofestivo;
      tarifa.recargofestivo = rateInfo.holidayValue;
    } else if (fecha.getDay() === 0) {
      tarifa.valorTotal = tarifa.valorTotal + rateInfo.holidayValue;
      tarifa.recargofestivo = rateInfo.holidayValue;
    } else if (this.IsEastern(fecha)) {
      tarifa.valorTotal = tarifa.valorTotal + rateInfo.holidayValue;
      tarifa.recargofestivo = rateInfo.holidayValue;
    }

    if (Distance.totalDistance > rateInfo.distanceIni) {
      tarifa.recargoDistancia = ((Distance.totalDistance - rateInfo.distanceIni) * rateInfo.valueDistExtra) / 100;
      tarifa.valorTotal = tarifa.valorTotal + tarifa.recargoDistancia;
    }
    if (!this.getNormalHour(fecha)) {
      tarifa.valorTotal = tarifa.valorTotal + rateInfo.nightValue;
      tarifa.recargoNocturno = rateInfo.nightValue;
    }
    tarifa.recargoParadas = (Distance.detail.length - 1) * rateInfo.valuexTraStop;
    tarifa.valorTotal = tarifa.valorTotal + tarifa.recargoParadas;

    return tarifa;
  }
  /**
   *
   *
   * @param {Date} fecha
   * @param {string} country
   * @return {*}  {string}
   * @memberof TarifaService
   */
  getHolidays(fecha: Date, country: string): string {
    if (!this.serchNormalDay(fecha)) return 'Festivo';
    else if (fecha.getDay() === 0) return 'Domingo';
    else if (this.IsEastern(fecha)) return 'Semana Santa';
    else return 'día de la semana normal';
  }

  addZero(fecha: Date) {
    let mes: string;
    let dia: string;
    if (fecha.getMonth() >= 0 && fecha.getMonth() < 10) mes = '0' + (Number(fecha.getMonth()) + 1).toString();
    else mes = '' + (Number(fecha.getMonth()) + 1).toString();
    if (fecha.getDate() > 0 && fecha.getDate() < 10) dia = '0' + fecha.getDate();
    else dia = '' + fecha.getDate();

    return mes + '-' + dia;
  }
  serchNormalDay(fecha: Date) {
    //
    let mesdia: string = this.addZero(fecha);
    for (let i = 0; i < this.HOLIDAYS.length; i++) {
      switch (this.HOLIDAYS[i].daysToSum) {
        case NEXT_DAY.NONE:
          if (mesdia === this.HOLIDAYS[i].day) return false;
          break;
        case NEXT_DAY.MONDAY:
          let x = this.HOLIDAYS[i].day.split('-', 2);
          let fecha_i = new Date(fecha.getFullYear(), parseInt(x[0]) - 1, parseInt(x[1]));
          if (fecha_i.getDay() != NEXT_DAY.MONDAY) {
            let j = fecha_i.getDay();
            fecha_i = new Date(fecha_i.setDate(fecha_i.getDate() + 8 - j));
          }
          let nuevafecha = this.addZero(fecha_i);
          if (nuevafecha === mesdia) return false;
      }
    }
    return true;
  }

  CalculoEquinoccio(fecha: Date) {
    let year = fecha.getFullYear();
    let A = year % 19;
    let B = Math.floor(year / 100);
    let C = year % 100;
    let D = Math.floor(B / 4);
    let E = B % 4;
    let F = Math.floor((B + 8) / 25);
    let G = Math.floor((B - F + 1) / 3);
    let H = (19 * A + B - D - G + 15) % 30;
    let I = Math.floor(C / 4);
    let K = C % 4;
    let L = (32 + 2 * E + 2 * I - H - K) % 7;
    let M = Math.floor((A + 11 * H + 22 * L) / 451);
    let N = H + L - 7 * M + 114;
    let month = Math.floor(N / 31);
    let day = 1 + (N % 31);
    return new Date(year, month - 1, day);
  }

  IsEastern(fecha: Date) {
    let eastern = this.CalculoEquinoccio(fecha);
    eastern = new Date(eastern.setDate(eastern.getDate() + this.EASTER_WEEK_HOLIDAYS[0].day));

    let mesdia: string = this.addZero(fecha);
    let festivo: string = this.addZero(eastern);
    if (festivo === mesdia) return true;

    eastern = new Date(eastern.setDate(eastern.getDate() + 1));
    festivo = this.addZero(eastern);

    if (festivo === mesdia) return true;

    return false;
  }

  getNormalHour(fecha: Date) {
    if (fecha.getHours() >= 6 && fecha.getHours() <= 19) return true;
    return false;
  }
}
