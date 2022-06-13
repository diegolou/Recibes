import { AbstractControl } from '@angular/forms';
import { Logger } from '@core';

const log = new Logger('addressLigthValidator');
/**
 *
 *
 * @export
 * @param {AbstractControl} control
 * @return {*}
 */
export function addressLigthValidator(control: AbstractControl): any {
  log.info('Ingreso Validador');
  if (!control.value || !control.value.valid) {
    log.info('Ingreso Validador- No paso la validación');
    return { addressValid: true };
  }
  return null;
}
