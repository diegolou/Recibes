import { Component, OnInit, Output, Input, EventEmitter, forwardRef } from '@angular/core';
import { ActiveCity } from '@entities';
import { ParametersService, ParameterResponse } from '@requests';
import { finalize } from 'rxjs/operators';
import { Logger } from '@core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const log = new Logger('ActiveCities');
@Component({
  selector: 'app-citydropdownlist',
  templateUrl: './citydropdownlist.component.html',
  styleUrls: ['./citydropdownlist.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CitydropdownlistComponent),
      multi: true,
    },
  ],
})
export class CitydropdownlistComponent implements OnInit, ControlValueAccessor {
  selectedCity: string;
  citiesList: Array<ActiveCity>;
  error: string;
  isDisabled: boolean;

  constructor(private parameterservice: ParametersService) {
    this.selectedCity = null;
    // this.getActiveCitiesList();
  }

  onChange = (_: any) => {};

  onTouch = () => {};

  @Input() set dataSource(val: Array<ActiveCity>) {
    this.citiesList = val;
  }

  @Output() onDataChange = new EventEmitter<ActiveCity>();
  ngOnInit(): void {}
  onChangeCity(val: any) {
    const result = this.citiesList.find((r) => r.codeGuid == val);
    this.onDataChange.emit(result);
    this.onTouch();
    this.onChange(result);
  }
  getActiveCitiesList(): Array<ActiveCity> {
    this.parameterservice
      .getActiveCities('COL')
      .pipe(finalize(() => {}))
      .subscribe(
        (ac: any) => {
          this.citiesList = ac;
        },
        (error) => {
          log.debug(`Registry error: ${error}`);
          this.error = error;
        }
      );
    return;
  }
  writeValue(value: any): void {
    if (value) {
      this.selectedCity = value;
    } else {
      this.selectedCity = null;
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
    this.onTouch();
    this.onChange(this.selectedCity);
  }
}
