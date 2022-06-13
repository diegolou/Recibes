import { Component, OnInit, Input } from '@angular/core';
import { PackageInfo, DistanceTimeTotalInfo, DistanceTimeInfo, TarifaInfo } from '@entities';

@Component({
  selector: 'app-transactiondetail',
  templateUrl: './transactiondetail.component.html',
  styleUrls: ['./transactiondetail.component.scss'],
})
export class TransactiondetailComponent implements OnInit {
  medioTrans: PackageInfo;
  distTimeList: DistanceTimeTotalInfo;
  detalle: string;
  plan: string;
  idayvuelta: boolean;
  saldoplan: number = 0;
  distancia: number = 0;
  tarifabase: number = 0;
  recargodist: number = 0;
  brecargodist: boolean = true;
  recargociual: number = 0;
  brecargociual: boolean = true;
  recargoparadas: number = 0;
  brecargoparadas: boolean = true;
  recargoFestivo: number = 0;
  brecargoFestivo: boolean = true;
  recargoNocurno: number = 0;
  brecargoNocurno: boolean = true;
  recaudoidavuelta: number = 0;
  brecaudoidavuelta: boolean = true;
  valorseguro: number = 0;
  bvalorseguro: boolean = true;
  propina: number = 0;
  bpropina: boolean = true;
  _tarifaInfo: TarifaInfo;
  descuento: number = 0;
  valorTotal: number = 0;
  valorpagar: number = 0;

  @Input() set distTimeInfo(val: DistanceTimeTotalInfo) {
    this.distTimeList = val;
    // se saca la información de las diferentes paradas que se van a tener en el sistema
    this.calcularInformacion();
  }

  @Input() set tip(val: number) {
    if (this.propina != val) {
      this.propina = val;
      this.bpropina = this.propina == 0 ? false : true;
    }
  }

  @Input() set tarifaInfo(val: TarifaInfo) {
    this._tarifaInfo = val;
    this.calcularInformacion();
  }
  @Input() set mediosTransporte(val: PackageInfo) {
    if (val != null) {
      this.medioTrans = val;
      const value = val.rateValueByCity.find((x) => x.tp_Priority == 1).valueDist;
      if (this.tarifabase != value) {
        this.tarifabase = value;
      }
    }
  }
  @Input() set insuredValue(val: number) {
    if (this.valorseguro != val) {
      this.valorseguro = val;
      this.bvalorseguro = this.valorseguro == 0 ? false : true;
    }
  }
  constructor() {}

  ngOnInit(): void {}

  calcularInformacion() {
    let aux: number;
    let aux1: number;

    // Primero se valida la información de las diferentes parada y se genera la información de detalle
    this.idayvuelta = false;
    if (this.distTimeList != null && this.distTimeList.detail.length > 0) {
      this.distancia = this.distTimeList.totalDistance / 1000;
      if (this.distTimeList.detail.length == 1) {
        this.detalle = 'El envío tiene 2 Paradas';
      } else {
        const index = this.distTimeList.detail.length - 1;
        let cant = 0;
        // miro si la ultima ditancia tienen el id 1 que inidca que el va vuelta
        if (this.distTimeList.detail[index].id == 1) {
          cant = index;
          this.idayvuelta = true;
        } else {
          cant = index + 1;
        }
        this.detalle = 'El envío tiene' + cant + ' Paradas y vuelta a la parada inicial';
      }
    }
    // Recardo distancia recargodist
    if (this._tarifaInfo != null) {
      this.recargodist = this._tarifaInfo.recargoDistancia;
      this.recargociual = 0;
      this.brecargociual = this.recargociual == 0 ? false : true;
      // this.recaudoidavuelta = this.idayvuelta ? this.medioTrans.tarife_sec : 0;
      this.brecaudoidavuelta = this.recaudoidavuelta == 0 ? false : true;
      this.recargoparadas = this._tarifaInfo.recargoParadas - this.recaudoidavuelta;
      this.brecargoparadas = this.recargoparadas == 0 ? false : true;
      this.recargoFestivo = this._tarifaInfo.recargofestivo;
      this.brecargoFestivo = this.recargoFestivo == 0 ? false : true;
      this.recargoNocurno = this._tarifaInfo.recargoNocturno;
      this.brecargoNocurno = this.recargoNocurno == 0 ? false : true;
      this.descuento = this._tarifaInfo.descuentos;
      this.valorpagar = this._tarifaInfo.valorTotal;
      this.valorTotal = this.valorpagar + this.descuento;
    }
  }
}
