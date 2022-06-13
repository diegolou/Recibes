import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  isCanceling = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          log.debug(`${credentials.username} successfully logged in`);

          switch (credentials.Status) {
            case 'active':
              this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
              break;
            case 'preactive':
              const navigationExtras: NavigationExtras = {
                state: {
                  activate: true,
                  customerId: credentials.userid,
                  profile: 'customer',
                },
              };
              this.router.navigate(['/activate'], navigationExtras);
              break;
            default:
              this.error = 'Cliente en estado no Valido';
              log.debug(`Login error: ${this.error}`);

              break;
          }
          // if (credentials.Status == 'active') {
          //
          // }
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }

  cancel() {
    this.isCanceling = true;
    this.router.navigate(['/home'], { replaceUrl: true });
    this.isCanceling = false;
  }
}
