import { Component, OnInit } from '@angular/core';
import { TypeOfPerson, PacAddress } from '@entities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { I18nService } from '@app/i18n';
import { PasswordValidation } from '@core/tools/password-validation';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

const TypeOfPersons = [
  { code: 'CC', name: 'Cédula de Ciudadanía', googleMapCP: 'COL' },
  { code: 'CE', name: 'Cédula de Extranjería', googleMapCP: 'COL' },
  { code: 'NITPN', name: 'NIT Persona Natural', googleMapCP: 'COL' },
  { code: 'NITPE', name: 'NIT Persona Extranjera', googleMapCP: 'COL' },
  { code: 'NITPJ', name: 'NIT Persona Juridica', googleMapCP: 'COL' },
];
@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.scss'],
})
export class UpdatePassComponent implements OnInit {
  isLoadingPass = false;

  isCancelingPass = false;
  constructor(private i18nService: I18nService, private formBuilder: FormBuilder, private router: Router) {
    this.createFormPass();
  }
  passForm: FormGroup;

  ngOnInit(): void {}
  onTypeOfPersonChange(typePerson: TypeOfPerson) {}
  private createFormPass() {
    this.isLoadingPass = false;
    this.passForm = this.formBuilder.group({
      PasswordValidation: this.formBuilder.group(
        {
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        },
        {
          validator: PasswordValidation.MatchPassword, // custom validation
        }
      ),
    });
  }

  get f() {
    return this.passForm.controls;
  }
  cancelPass() {
    this.isCancelingPass = true;
    this.router.navigate(['/home'], { replaceUrl: true });
    this.isCancelingPass = false;
  }

  changePassword() {}
}
