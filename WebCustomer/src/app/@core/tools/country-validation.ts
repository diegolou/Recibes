import { AbstractControl } from '@angular/forms';
export class CountryValidation {
  static CountryActive(AC: AbstractControl): boolean | undefined {
    let country = 'COL'; // to get value in input tag
    let countryUser = AC.get('paises').value; // to get value in input tag

    if (country !== countryUser) {
      AC.get('paises').setErrors({ CountryActive: true });
    } else {
      return null;
    }
  }
}
