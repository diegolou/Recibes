import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Logger, untilDestroyed } from '@core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SecurityService } from '@requests';

const log = new Logger('ActivationCode');

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss'],
})
export class ActivateComponent implements OnInit, OnDestroy {
  error: string | undefined;
  isLoading = false;
  isCanceling = false;
  isCode = false;
  customerId: string;
  activateForm!: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private security: SecurityService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.isLoading = false;
    const act = this.route.snapshot.data['actcode'];
    log.info(act.ActivationCode);
    this.customerId = act.CustomerId;
  }
  ngOnDestroy() {}
  activate() {
    this.isLoading = true;
    const sec$ = this.security.ActivateUser({
      customerId: this.customerId,
      profile: 'customer',
      acivationCode: this.activateForm.value.activationcode,
    });

    sec$
      .pipe(
        finalize(() => {
          this.activateForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe((act) => {
        this.router.navigate(['/login'], { replaceUrl: true });
      }),
      (error: any) => {
        log.debug(`Login error: ${error}`);
        this.error = error;
      };
  }
  reload() {
    this.isCode = true;
    const act$ = this.security.ActivationCode({ customerId: this.customerId, profile: 'customer' });
    act$
      .pipe(
        finalize(() => {
          this.isCode = false;
        })
      )
      .subscribe((act) => {
        log.info(act.activationCode);
      }),
      (error: any) => {
        this.error = error;
      };
  }
  cancel() {
    this.isCanceling = true;
    this.router.navigate(['/home'], { replaceUrl: true });
    this.isCanceling = false;
  }

  private createForm() {
    this.activateForm = this.formBuilder.group({ activationcode: ['', Validators.required] });
  }
}
