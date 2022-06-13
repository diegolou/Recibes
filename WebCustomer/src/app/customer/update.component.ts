import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CredentialsService } from '@app/auth';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { I18nService } from '@app/i18n';

import { PasswordValidation } from '@core/tools/password-validation';
import { EmailValidation } from '@core/tools/email-validation';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  isLoading = false;

  isCanceling = false;
  constructor(
    private credentialsService: CredentialsService,
    // private translateService: TranslateService,
    private i18nService: I18nService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // this.createFormPass();
    // this.createFormEmail();
  }

  updatePasswordForm: FormGroup;
  updateEmailForm: FormGroup;

  ngOnInit(): void {}
  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.usernamedescrip : null;
  }
  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  private createFormPass() {
    this.isLoading = false;

    this.updatePasswordForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: PasswordValidation.MatchPassword, // custom validation
      }
    );
  }
  private createFormEmail() {
    this.isLoading = false;

    this.updateEmailForm = this.formBuilder.group({
      EmailValidation: this.formBuilder.group(
        {
          eMail: [
            '',
            [
              Validators.required,
              Validators.pattern(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ),
              Validators.maxLength(50),
            ],
          ],
          ConfirmEmail: [
            '',
            [
              Validators.required,
              Validators.pattern(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ),
              Validators.maxLength(50),
            ],
          ],
        },
        {
          validator: EmailValidation.MatchEmail, // custom email
        }
      ),
    });
  }

  updatepassword() {}

  updateemail() {}
}
