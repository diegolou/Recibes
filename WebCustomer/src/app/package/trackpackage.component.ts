import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { finalize } from 'rxjs/operators';
import { Logger } from '@core';
import { TranslateService } from '@ngx-translate/core';
import { ParametersService } from '@core/Requests';
import { CredentialsService } from '@app/auth';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AddressType } from '@enum';
import { AddressInfo, PackageStatus } from '@entities';
import { PackageService } from '@requests';
import Swal from 'sweetalert2';
import * as _moment from 'moment';

const log = new Logger('PackageStatus');

@Component({
  selector: 'app-trackpackage',
  templateUrl: './trackpackage.component.html',
  styleUrls: ['./trackpackage.component.scss'],
})
export class TrackpackageComponent implements OnInit, OnDestroy {
  error: string = '';
  timer = true;
  isLoading = false;
  isCanceling = false;
  msgCargue: string;
  psList: PackageStatus;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private packageServices: PackageService,
    private credentialsService: CredentialsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.msgCargue = this.translateService.instant('Loading information, wait a moment!');
    this.getInfo();
    // this.packageServices
    //   .PackageStatus({
    //     customerId: this.userId,
    //     filterType: 5,
    //     bDateFilter: bDate.toDate(),
    //     eDateFilter: eDate.toDate(),
    //   })
    //   .pipe(
    //     finalize(() => {
    //       // this.sendPackageForm.markAsPristine();
    //       this.isLoading = false;
    //     })
    //   )
    //   .subscribe(
    //     (r) => {
    //       this.psList = r ;
    //       setTimeout (() => {
    //         console.log("Hello from setTimeout");
    //      }, 5000);
    //     },
    //     (error) => {
    //       log.debug(`Registry error: ${error}`);
    //       this.error = error;
    //     }
    //   );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this.timer = false;
  }
  getInfo() {
    if (this.timer) {
      const bDate = _moment().utc().add(-1, 'month');
      const eDate = _moment().utc();
      this.packageServices
        .PackageStatus({
          customerId: this.userId,
          filterType: 6,
          bDateFilter: bDate.toDate(),
          eDateFilter: eDate.toDate(),
        })
        .pipe(
          finalize(() => {
            // this.sendPackageForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          (r) => {
            this.psList = r;
            if (this.timer) {
              setTimeout(() => {
                this.getInfo();
              }, 20000);
            }
          },
          (error) => {
            log.debug(`Registry error: ${error}`);
            this.error = error;
          }
        );
    }
  }
  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.usernamedescrip : null;
  }
  get userId(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.userid : null;
  }
  // getDescriptionStatus(satus: string) {
  //   switch (satus) {
  //     case 'waiting':
  //       return this.translateService.instant('We are in the process of assigning a Packer. Wait a moment please.');
  //       break;
  //     case 'running':
  //       return this.translateService.instant('In process of sending your package');
  //       break;
  //     case 'finalized':
  //       return this.translateService.instant('Package delivered.');
  //     default:
  //       return status ;
  //       break;
  //   }
  // }
}
