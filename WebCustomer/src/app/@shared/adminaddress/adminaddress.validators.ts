import { AbstractControl } from '@angular/forms';
import { Logger } from '@core';

const log = new Logger('addressValidator');

export function adminAddressValidator(control: AbstractControl) {
  log.info('Address Validador');
  if (!control.value) {
    log.info('Ingreso Validador- No paso la validación');
    return { addressInValid: true };
  }
  if (!control.value.Validador) {
    return { addressInValid: true };
  }
  if (control.value.PacAddressList.length < 2) {
    return { minValue: true };
  }
  return null;
}
