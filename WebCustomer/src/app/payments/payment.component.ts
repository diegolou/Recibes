import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '@requests';
import { PaymentRequest } from '@entities';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { String } from 'typescript-string-operations';
import { environment } from '@env/environment';
import { LocalService, Logger, SessionService } from '@core';
import { finalize } from 'rxjs/operators';

const log = new Logger('SubmitPayment');

declare var WidgetCheckout: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  infoPayment: PaymentRequest;
  error: number;
  constructor(
    private router: Router,
    private paymentservice: PaymentsService,
    private sessionservice: SessionService,
    private translateService: TranslateService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const stater = navigation.extras.state as {
      activityId: string;
      reference: string;
      paymentId: string;
      totalP: number;
      paymentT: string;
      taxes: number;
      origen: string;
    };
    this.infoPayment = stater;
    log.info('Constructor');
  }

  ngOnInit(): void {
    log.info('ngOnInit');
    debugger;
    // Identificar el tipo de pago que se va a realizar
    switch (this.infoPayment.paymentT.toUpperCase()) {
      case 'WAMPI':
        this.sessionservice.setJsonValue('InfoPayment', this.infoPayment);
        this.wampiPromise().then((r) => {
          var transaction = r.transaction;
          log.info('RTA Wampi:', r);
          log.info('Reference', this.infoPayment.reference);

          // Se llama al endpoint que se encarga de actualizar el pago
          this.paymentservice
            .SubmitPayment({
              activityId: this.infoPayment.activityId,
              reference: this.infoPayment.reference,
              paymentId: this.infoPayment.paymentId,
              paymentState: r.status,
              paymentValue: this.infoPayment.totalP,
              otherInfo: '',
            })
            .pipe(
              finalize(() => {
                // this.sendPackageForm.markAsPristine();
                // this.isLoading = false;
              })
            )
            .subscribe(
              (response) => {
                // Se debe redireccionar a la pagina de respuesta
              },
              (error) => {
                log.debug(`Registry error: ${error}`);
                this.error = error;
              }
            );
        });
        break;
      case 'CASH':
        break;
      case 'PLAN':
        break;
      default:
        log.warn(
          String.Format(
            '{0} {1}',
            this.infoPayment.paymentT,
            'is Payment type not valid for that reason redirect to home page'
          )
        );
        this.router.navigate(['/home']);
        break;
    }
  }

  wampiPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      var checkout = new WidgetCheckout({
        currency: 'COP',
        amountInCents: this.infoPayment.totalP * 100,
        reference: this.infoPayment.reference,
        publicKey: environment.wampiPublicKey,
        redirectUrl: environment.wampiReturn,
      });

      checkout.open(function (result: any) {
        var transaction = result.transaction;
        resolve(transaction);
      });
    });
  }
}
