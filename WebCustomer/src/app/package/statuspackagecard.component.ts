import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PackageStatus } from '@entities';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { StatepackageComponent } from './statepackage.component';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { CredentialsService } from '@app/auth';
import { NavigationExtras, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ArrayHelper } from '@core';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-statuspackagecard',
  templateUrl: './statuspackagecard.component.html',
  styleUrls: ['./statuspackagecard.component.scss'],
})
export class StatuspackagecardComponent implements OnInit {
  _packStatusList: Array<PackageStatus>;
  _sortedData: Array<PackageStatus>;
  lengthlist: number = 0;
  page_size: number = 5;
  page_number: number = 1;
  pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() set packStatusList(val: Array<PackageStatus>) {
    if (val) {
      this._packStatusList = val;
      this._sortedData = ArrayHelper.deepCopy(val);
      this.lengthlist = val.length;
    } else {
      this.lengthlist = 0;
    }
  }

  isLoading = false;
  constructor(
    private translateService: TranslateService,
    private credentialsService: CredentialsService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  ngOnDestroy() {}
  viewDetail(activityId: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        activityId: activityId,
        customerId: this.userId,
      },
    };
    this.router.navigate(['/package/activitydetail'], navigationExtras);
  }
  get userId(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.userid : null;
  }
  getDescriptionStatus(satus: string) {
    switch (satus) {
      case 'waiting':
        return this.translateService.instant('Por Asignar.');
        break;
      case 'running':
        return this.translateService.instant('In process.');
        break;
      case 'finalized':
        return this.translateService.instant('Package delivered.');
      default:
        return status;
        break;
    }
  }
  detalle() {
    alert('viendo detalle de la actividad');
  }
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
  sortData(sort: Sort) {
    const data = ArrayHelper.deepCopy(this._packStatusList);
    if (!sort.active || sort.direction === '') {
      this._sortedData = data;
      return;
    }

    this._sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date':
          return this.compare(a.createDate.toString(), b.createDate.toString(), isAsc);
        case 'activityid':
          return this.compare(a.activityId, b.activityId, isAsc);
        case 'apacker':
          let acomp = '';
          if (a.packer) {
            acomp = String.Format('{0} {1}', a.packer.firstName, a.packer.lastName);
          }
          let bcomp = '';
          if (b.packer) {
            bcomp = String.Format('{0} {1}', b.packer.firstName, b.packer.lastName);
          }
          return this.compare(acomp, bcomp, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
