import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
export interface IdPersonValue {
  idType: string;
  idNumber: string;
}
@Component({
  selector: 'app-idperson',
  templateUrl: './idperson.component.html',
  styleUrls: ['./idperson.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdpersonComponent),
      multi: true,
    },
  ],
})
export class IdpersonComponent implements OnInit {
  _idpersonfinal: string;
  _idperson: string;
  _digitV: string;
  _typeofperson: string;
  _hideDigit: boolean = false;
  _idpersonForm: FormGroup;
  _isDisabled: boolean;
  _mask: string;
  constructor(private formBuilder: FormBuilder) {
    this.createFormGen();
  }
  onChange = (_: any) => {};

  onTouch = () => {};
  @Input() set typeOfPerson(val: string) {
    this._typeofperson = val;
    this._hideDigit = this.hideDigit;
    // this.cdRef.detectChanges();
  }
  @Input() set Mask(val: string) {
    this._mask = val;
  }
  @Output() onDataChange = new EventEmitter<string>();
  ngOnInit(): void {}

  onKey(xy: string) {
    const x = this.getDigitVerif(this._idpersonForm.controls.PersonId.value);
    this._idpersonForm.controls.verifdigitid.setValue(x);
    this._idpersonfinal = this._idpersonForm.controls.PersonId.value;
    if (this._idpersonForm.invalid) {
      this._idpersonfinal = '';
    }
    this.onDataChange.emit(this._idpersonfinal);
    this.onTouch();
    this.onChange(this._idpersonfinal);
    // let x = this.getDigitVerif(this.registryForm.controls.PersonId.value);
    // this.registryForm.controls.verifdigitid.setValue(x);
  }
  private createFormGen() {
    this._idpersonForm = this.formBuilder.group({
      PersonId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      verifdigitid: [''],
    });
  }
  getDigitVerif(Nit: string) {
    let Residuo: number = 0;
    let Acumulador: number = 0;
    let Vector: number[] = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];

    for (let i = 0; i < Nit.length; i++) {
      Acumulador = Acumulador + Number(Nit[Nit.length - 1 - i].toString()) * Vector[i];
    }

    Residuo = Acumulador % 11;
    if (Residuo > 1) return (11 - Residuo).toString();

    return Residuo.toString();
  }
  get hideDigit() {
    let rta: boolean;
    if (this._typeofperson) {
      switch (this._typeofperson) {
        case 'NITPN':
        case 'NITPE':
        case 'NITPJ':
          rta = true;
          break;
        default:
          rta = false;
      }
    } else {
      rta = false;
    }
    return rta;
  }
  get f() {
    return this._idpersonForm.controls;
  }
  writeValue(value: any): void {
    if (value) {
      // this._typeofperson = value.idType;
      this._hideDigit = this.hideDigit;
      this._idpersonForm.controls.PersonId.setValue(value);
      if (this._hideDigit) {
        const x = this.getDigitVerif(this._idpersonForm.controls.PersonId.value);
        this._idpersonForm.controls.verifdigitid.setValue(x);
      }
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }
}
