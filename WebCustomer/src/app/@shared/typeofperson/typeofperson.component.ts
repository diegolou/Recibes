import { Component, OnInit, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { TypeOfPerson } from '@entities';
import { ParametersService } from '@requests';
import { finalize } from 'rxjs/operators';
import { Logger } from '@core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const log = new Logger('TypeOfPersons');

@Component({
  selector: 'app-typeofperson',
  templateUrl: './typeofperson.component.html',
  styleUrls: ['./typeofperson.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeofpersonComponent),
      multi: true,
    },
  ],
})
export class TypeofpersonComponent implements OnInit, ControlValueAccessor {
  selectedTypeOfPerson: string;
  typeofperson: Array<TypeOfPerson>;
  error: string;
  isDisabled: boolean;
  constructor(private parameterservice: ParametersService) {
    this.selectedTypeOfPerson = null;
  }
  onChange = (_: any) => {};

  onTouch = () => {};

  @Input() set dataSource(val: Array<TypeOfPerson>) {
    this.typeofperson = val;
  }
  @Output() onDataChange = new EventEmitter<TypeOfPerson>();

  ngOnInit(): void {}

  onChangeTypeOfPerson(val: any) {
    const result = this.typeofperson.find((r) => r.code == val);
    this.onDataChange.emit(result);
    this.onTouch();
    this.onChange(result);
  }
  getActiveCitiesList(): Array<TypeOfPerson> {
    /*this.parameterservice
      .getActiveCities('COL')
      .pipe(finalize(() => {}))
      .subscribe(
        (ac: any) => {

          this.typeofperson = ac;
        },
        (error) => {
          log.debug(`Registry error: ${error}`);
          this.error = error;
        }
      );*/
    return;
  }
  writeValue(value: any): void {
    if (value) {
      // this.typeofperson = value;
      this.selectedTypeOfPerson = value;
      const result = this.typeofperson.find((r) => r.code == value);
      this.onDataChange.emit(result);
      this.onTouch();
      this.onChange(result);
    } else {
      this.selectedTypeOfPerson = null;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  onFocus() {
    // this.onTouch();
    // this.onChange(this.selectedTypeOfPerson);
  }
}
