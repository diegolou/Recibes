import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Logger } from '@app/@core';
import { CredentialsService } from '@app/auth';
import { PaymentsService } from '@requests';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

const log = new Logger('ProcessPayment');

@Component({
  selector: 'app-paymentprocess',
  templateUrl: './paymentprocess.component.html',
  styleUrls: ['./paymentprocess.component.scss'],
})
export class PaymentprocessComponent implements OnInit {
  idPago: string;
  env: string;
  error: string;
  isLoading: boolean = false;
  msgCargue: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentservice: PaymentsService,
    private credentialsService: CredentialsService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.msgCargue = this.translateService.instant('Processing payment, wait a moment!');
    // se captura el id para el procesamiento de la respuesta entregada por bancolombia.
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idPago = params['id'];
      this.env = params['env'];
    });
    this.paymentservice
      .ProcessPayment(this.idPago)
      .pipe(
        finalize(() => {
          // this.sendPackageForm.markAsPristine();
          // this.isLoading = false;
        })
      )
      .subscribe(
        (response) => {
          // Se debe redireccionar a la pagina de respuesta
          debugger;
          switch (response.Response) {
            case 'APPROVED':
              this.viewDetail(response.ActivityId);
              break;
            case 'DECLINED':
              const url = '/payments/paymentresult';
              this.router.navigate([url], { queryParams: { status: response.Response } });
              break;
            case 'ERROR':
              break;

            default:
              break;
          }
        },
        (error) => {
          log.debug(`Registry error: ${error}`);
          this.error = error;
        }
      );
  }

  viewDetail(activityId: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        activityId: activityId,
        customerId: this.userId,
      },
    };
    this.router.navigate(['/package/activitydetail'], navigationExtras);
  }
  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.usernamedescrip : null;
  }
  get userId(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.userid : null;
  }
}
