import { AbstractControl } from '@angular/forms';
export class EmailValidation {
  static MatchEmail(AC: AbstractControl): boolean | undefined {
    if (AC) {
      let Email = AC.get('eMail').value; // to get value in input tag
      let confirmEmail = AC.get('ConfirmEmail').value; // to get value in input tag
      if (Email !== confirmEmail) {
        AC.get('ConfirmEmail').setErrors({ MatchEmail: true });
      } else {
        return null;
      }
    }
  }
}
