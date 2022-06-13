import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { PackageInfo } from '@entities';
import { ParametersService } from '@requests';
import { finalize } from 'rxjs/operators';
import { Logger } from '@core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const log = new Logger('TransportType');
@Component({
  selector: 'app-transportdropdownlist',
  templateUrl: './transportdropdownlist.component.html',
  styleUrls: ['./transportdropdownlist.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransportdropdownlistComponent),
      multi: true,
    },
  ],
})
export class TransportdropdownlistComponent implements OnInit, ControlValueAccessor {
  isDisabled: boolean;
  selectedtrans: string;
  transporteList: Array<PackageInfo>;
  error: string;

  constructor(private parameterservice: ParametersService) {
    this.selectedtrans = null;
    // this.getTrasnsportType();
  }
  @Input() set dataSource(val: Array<PackageInfo>) {
    this.transporteList = val;
  }
  @Output() onDataChange = new EventEmitter<PackageInfo>();

  onChange = (_: any) => {};

  onTouch = () => {};

  ngOnInit(): void {}
  /**
   *Evento cuando se selecciona la ciudad
   *
   * @param {*} val
   * @memberof TransportdropdownlistComponent
   */
  onChangeTransport(val: any) {
    const result = this.transporteList.find((r) => r.tp_code == val);
    this.onDataChange.emit(result);
    this.onTouch();
    this.onChange(result);
  }
  /**
   *Funcion que se encarga de traer la información de los tipos de transporte registrados
   *en el sistema Recibes
   *
   * @return {*}  {Array<MediosTransporte>}
   * @memberof TransportdropdownlistComponent
   */
  getTrasnsportType(): Array<PackageInfo> {
    this.parameterservice
      .getTransportType()
      .pipe(finalize(() => {}))
      .subscribe(
        (tt: any) => {
          this.transporteList = tt;
        },
        (error) => {
          log.debug(`Registry error: ${error}`);
          this.error = error;
        }
      );
    return;
  }
  /**
   *Funcion que se dispara cuando se realiza cualquier cambio al valor de control
   *
   * @param {*} value
   * @memberof TransportdropdownlistComponent
   */
  writeValue(value: any): void {
    if (value) {
      this.selectedtrans = value.code ? value.code : null;
    } else {
      this.selectedtrans = null;
    }
  }
  /**
   *Funcion para registrar el el evento de cambio de información que
   *genera el control
   *
   * @param {*} fn
   * @memberof TransportdropdownlistComponent
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  /**
   *Funcion que registra en evento de toque del control
   *
   * @param {*} fn
   * @memberof TransportdropdownlistComponent
   */
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  /**
   *Fución que registra el evento de deshabilitar los elementos del control
   *
   * @param {boolean} isDisabled
   * @memberof TransportdropdownlistComponent
   */
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  /**
   *Función que se ejecuta cuando se hace foco al control
   *
   * @memberof TransportdropdownlistComponent
   */
  onFocus() {
    this.onTouch();
    this.onChange(this.selectedtrans);
  }
}
