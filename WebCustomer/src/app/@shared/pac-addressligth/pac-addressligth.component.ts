import { Component, OnInit, Input, Output, forwardRef, EventEmitter, ViewChild } from '@angular/core';
import { PacAddress } from '@app/Entities/pacaddress';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Logger, ArrayHelper, LocationService } from '@core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const log = new Logger('Pac-AddressLigth');

@Component({
  selector: 'app-pac-addressligth',
  templateUrl: './pac-addressligth.component.html',
  styleUrls: ['./pac-addressligth.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PacAddressligthComponent),
      multi: true,
    },
  ],
})
export class PacAddressligthComponent implements OnInit, ControlValueAccessor {
  valueAddress: string;
  caddressinfo: any;
  addressSpecifiques: string;
  detail: string;
  valactual: string;
  isDisabled: boolean;

  @Input() placeholder: string;

  @Output() onDataChange = new EventEmitter<PacAddress>();

  @Output() seladdress: PacAddress;

  onChange = (_: any) => {};

  onTouch = () => {};

  options = {
    types: ['geocode'],
    componentRestrictions: {
      country: 'CO',
    },
  };

  constructor(private location: LocationService) {}

  ngOnInit(): void {}

  public AddressChange(address: any) {
    this.seladdress = this.location.setInfoPacAddress(this.seladdress, address, '1');
    // if (this.seladdress == null) {
    this.onDataChange.emit(this.seladdress);
    this.onTouch();
    this.onChange(this.seladdress);
  }
  onbluras(event: any) {
    if (this.seladdress == null) {
      this.seladdress = new PacAddress();
      this.seladdress.valid = false;
    }
    this.seladdress.id = '1';
    this.seladdress.details = event;
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
  prueba(val: any) {
    log.debug('cambio:' + val);
  }
  onblur(event: any) {
    if (!this.seladdress) {
      this.seladdress = new PacAddress();
      this.seladdress.valid = false;
    }
    if (this.valactual != event) {
      this.seladdress.valid = false;
    }
    // log.info('onblur:' + this.seladdress.control);
    this.onDataChange.emit(this.seladdress);
    this.onTouch();
    this.onChange(this.seladdress);
  }
  onfocus(val: any) {
    this.valactual = val;
    log.debug('Focus:' + val);
  }
  /**
   *
   *
   * @param {*} value
   * @memberof PacAddressligthComponent
   */
  writeValue(value: any): void {
    log.info('writeValue:' + value);
    if (value != null && value != '') {
      this.valueAddress = value.formattedaddress;
      this.seladdress = ArrayHelper.deepCopy(value);
      this.addressSpecifiques = this.seladdress.details;
      // this.detail = this.seladdress.Instruccions;
    } else {
      this.seladdress = new PacAddress();
      this.seladdress.valid = false;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  /**
   *Registra ek evento de toque del control PacAddress
   *
   * @param {*} fn
   * @memberof PacAddressligthComponent
   */
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  /**
   *Registra el evento de deshabilitar el control PacAddress
   *
   * @param {boolean} isDisabled
   * @memberof PacAddressligthComponent
   */
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
