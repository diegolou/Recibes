import { AbstractControl } from '@angular/forms';
import { Logger } from '@core';

const log = new Logger('addressValidator');
/**
 *
 *
 * @export
 * @param {AbstractControl} control
 * @return {*}
 */
export function addressValidator(control: AbstractControl): any {
  log.info('Ingreso Validador');
  if (!control.value || !control.value.valid) {
    log.info('Ingreso Validador- No paso la validación');
    return { addressValid: true };
  }
  return null;
}
