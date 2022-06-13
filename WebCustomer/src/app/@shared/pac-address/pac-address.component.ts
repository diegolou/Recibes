import {
  Component,
  OnInit,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { PacAddress } from '@app/Entities/pacaddress';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Logger, ArrayHelper, LocationService } from '@core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const log = new Logger('Pac-Address');

@Component({
  selector: 'app-pac-address',
  templateUrl: './pac-address.component.html',
  styleUrls: ['./pac-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PacAddressComponent),
      multi: true,
    },
  ],
})
export class PacAddressComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  valueAddress: string;
  public caddressinfo: any;
  public addressSpecifiques: string;
  public detail: string;
  valactual: string;
  _idClass: string;
  idClassP: string;

  @Input() set idclass(id: string) {
    this._idClass = id.toString();
    this.idClassP = (Number(id) + 1).toString();
  }
  /**
   *Input donde se informa que se tiene que ocultar el botono de borrar
   *
   * @type {boolean}
   * @memberof PacAddressComponent
   */
  @Input() hidden: boolean;
  /**
   *
   *
   * @type {PacAddress}
   * @memberof PacAddressComponent
   */
  @Output() seladdress: PacAddress;
  /**
   *Output que se encarga de generar un evento una vez que se se realice algun
   *cambio en la información de pacaddress
   *
   * @memberof PacAddressComponent
   */
  @Output() onDataChange = new EventEmitter<PacAddress>();
  /**
   *Output que informa del evento de borrar el control de Pacaddress
   *
   * @memberof PacAddressComponent
   */
  @Output() deleteAddress = new EventEmitter<string>();
  ngAfterViewInit() {}
  /**
   *Variable que se encarga de habilitar o deshabilitar los controles
   *
   * @type {boolean}
   * @memberof PacAddressComponent
   */
  public isDisabled: boolean;

  /**
   *Interfaces que se necesitan para poder soportar la funcionalidad de form reactive
   * de angular
   *
   * @param {*}
   * @memberof PacAddressComponent
   */
  onChange = (_: any) => {};
  /**
   *Interfaz para informar que se toco el control PAcaddress
   *
   * @memberof PacAddressComponent
   */
  onTouch = () => {};
  /**
   *Variable que contiene la información de configuración
   *del control de direcciones de google.
   *
   * @memberof PacAddressComponent
   */
  options = {
    types: ['geocode'],
    componentRestrictions: {
      country: 'CO',
    },
  };
  /**
   * Creates an instance of PacAddressComponent.
   * @memberof PacAddressComponent
   */
  constructor(private location: LocationService) {}
  /**
   *
   *
   * @memberof PacAddressComponent
   */
  ngOnInit(): void {}
  /**
   *evento de blur cuando se sale del control de detalle de la
   *dirección.
   *
   * @param {*} event
   * @memberof PacAddressComponent
   */
  onbluras(event: any) {
    if (this.seladdress == null) {
      this.seladdress = new PacAddress();
      this.seladdress.valid = false;
      this.seladdress.id = this._idClass;
    }
    // this.seladdress.id = this._idClass;
    this.seladdress.details = event;
    this.onDataChange.emit(this.seladdress);
    this.onTouch();
    this.onChange(this.seladdress);
  }
  /**
   *Evento blur del control que instricciones de la dirección
   *
   * @param {*} event
   * @memberof PacAddressComponent
   */
  onblurins(event: any) {
    if (this.seladdress == null) {
      this.seladdress = new PacAddress();
      this.seladdress.valid = false;
      this.seladdress.id = this._idClass;
    }
    // this.seladdress.id = this._idClass;
    this.seladdress.Instruccions = event;
    this.onDataChange.emit(this.seladdress);
    this.onTouch();
    this.onChange(this.seladdress);
  }
  /**
   *Evento de blur del control de direccdiones.
   *
   * @param {*} event
   * @memberof PacAddressComponent
   */
  onblur(event: any) {
    if (this.valactual != event) {
      this.seladdress.valid = false;
    }
    this.onDataChange.emit(this.seladdress);
    this.onTouch();
    this.onChange(this.seladdress);
  }

  displaySuggestions = function (
    predictions: google.maps.places.QueryAutocompletePrediction[],
    status: google.maps.places.PlacesServiceStatus
  ) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }

    const result = predictions[0];
  };
  /**
   *Evento que se genera al momento de solicitar la eliminación del control
   *PacAddress
   *
   * @param {string} id
   * @memberof PacAddressComponent
   */
  deleteaddress(id: string) {
    this.deleteAddress.emit(id);
  }
  /**
   *
   *
   * @memberof PacAddressComponent
   */
  ngOnDestroy(): void {}
  /**
   *Evento cuando se hace foco sobre el control
   *de la dirección
   *
   * @memberof PacAddressComponent
   */
  onfocus(val: any) {
    this.valactual = val;
    log.info(val);
  }
  /**
   *Evento de selección de una dirección dentro del control de
   *direcciones.
   *
   * @param {*} address
   * @memberof PacAddressComponent
   */
  public AddressChange(address: any) {
    this.seladdress = this.location.setInfoPacAddress(this.seladdress, address, this.idClassP);
    this.onDataChange.emit(this.seladdress);
    this.onTouch();
    this.onChange(this.seladdress);
  }

  AutocompleteSelected(event: any) {
    log.debug('entro a AutocompleteSelected');
  }
  GermanAddressMapped(event: any) {
    log.debug('entro a GermanAddressMapped');
  }
  LocationSelected(event: any) {
    log.debug('entro a LocationSelected');
  }
  Change(event: any) {
    log.debug('entro a LocationSelected');
  }
  /**
   *Funcion que se ejecuta cuando den el form control o en el ngModel se
   *ingresa la información de pacaddress
   *
   * @param {*} value
   * @memberof PacAddressComponent
   */
  writeValue(value: any): void {
    if (value != null && value != '') {
      this.valueAddress = value.formattedaddress;
      this.seladdress = ArrayHelper.deepCopy(value);
      this.addressSpecifiques = this.seladdress.details;
      this.detail = this.seladdress.Instruccions;
    } else {
      this.seladdress = new PacAddress();
      this.seladdress.valid = false;
    }
  }
  /**
   *Registra el evento de cambio del control Pacaddress
   *
   * @param {*} fn
   * @memberof PacAddressComponent
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  /**
   *Registra ek evento de toque del control PacAddress
   *
   * @param {*} fn
   * @memberof PacAddressComponent
   */
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  /**
   *Registra el evento de deshabilitar el control PacAddress
   *
   * @param {boolean} isDisabled
   * @memberof PacAddressComponent
   */
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
