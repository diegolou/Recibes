import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Logger } from '@app/@core';

const log = new Logger('ProcessPayment');

@Component({
  selector: 'app-paymentresult',
  templateUrl: './paymentresult.component.html',
  styleUrls: ['./paymentresult.component.scss'],
})
export class PaymentresultComponent implements OnInit {
  isLoading: boolean = false;
  result: string;
  msgCargue: string;

  constructor(
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.result = params['status'];
    });
    switch (this.result) {
      case 'APPROVED':
        this.msgCargue = this.translateService.instant('Transaction successful!');
        break;
      case 'DECLINED':
        this.msgCargue = this.translateService.instant('Transaction declined!');
        break;
      case 'ERROR':
        break;
      default:
        this.router.navigate(['/home']);
        break;
    }
  }
}
