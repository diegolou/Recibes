import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { KalmanOnLocationService, OdistanceService } from '@core';
import { GeoLocationService, PackageService } from '@requests';
import { finalize } from 'rxjs/operators';
import { Logger } from '@core';
import { ActivityDetail, AddressInfo } from '@entities';
import { ActivatedRoute } from '@angular/router';
import { DetailAddressComponent } from './detail-address.component';
import * as _moment from 'moment';
import { String } from 'typescript-string-operations';
// import { GoogleMapsAPIWrapper, AgmMap, } from '@agm/core';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import {MatDialog} from '@angular/material/dialog';
const log = new Logger('ActivityDetail');

@Component({
  selector: 'app-statepackage',
  templateUrl: './statepackage.component.html',
  styleUrls: ['./statepackage.component.scss'],
})
export class StatepackageComponent implements OnInit, AfterViewInit {
  bounds: any;
  latitude: number = 4.734295;
  longitude: number = -74.0375782;
  zoom: number = 17;
  closeResult: any;
  isLinear = false;
  error: string;
  public polylines: Array<any>;
  public packageInfo: any;
  addressInfoList: Array<any>;
  packerInfo: any;
  createDate: Date;
  asingPackerDate: Date;
  startProcess: boolean;
  final: number;
  @Input() customerId: string;
  @Input() activityId: string;

  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  @ViewChild(DetailAddressComponent) da: DetailAddressComponent;
  constructor(
    // public dialogRef: MatDialogRef<StatepackageComponent>,
    private mapsAPILoader: MapsAPILoader,
    private geolocations: GeoLocationService,
    private kalman: KalmanOnLocationService,
    private route: ActivatedRoute,
    private packageServices: PackageService,
    private distanceService: OdistanceService
  ) {
    // dialogRef.disableClose = true;
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }
  ngOnInit(): void {
    // this.latitude = 4.6955404;
    // this.longitude = -74.0400516;
    //load Places Autocomplete

    // this.addressInfoList = this.route.snapshot.data['ActivityDetail'];
    this.getActivityDetail();
    this.mapsAPILoader.load().then(() => {});
  }
  ngAfterViewInit() {
    // this.da.AddressInfoList = this.addressInfoList ;
    // this.agmMap.mapReady.subscribe((map: any) => {
    //
    //   const bounds = new google.maps.LatLngBounds();
    //   for (const mm of this.addressInfoList) {
    //     bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
    //   }
    //   map.fitBounds(bounds);
    // });
  }
  getActivityDetail() {
    this.packageInfo = this.route.snapshot.data['ActivityDetail'];
    //
    if (this.packageInfo) {
      var minDate = _moment.utc('0001-01-01');

      this.createDate = this.packageInfo.createDate;
      // this.asingPackerDate = this.packageInfo.packerAssigDate;
      this.asingPackerDate = _moment.utc(this.packageInfo.packerAssigDate).isAfter(minDate)
        ? this.packageInfo.packerAssigDate
        : this.packageInfo.createDate;
      this.packerInfo = this.packageInfo.packer;
      this.startProcess = this.packageInfo.packer ? true : false;
      this.addressInfoList = this.packageInfo.addressInfoList;
      this.final = this.addressInfoList.length - 1;

      this.bounds = new google.maps.LatLngBounds();
      for (const mm of this.addressInfoList) {
        this.bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
      }
    }
  }
  formatAddress(address: string, addnumber: string): string {
    let rta = '';
    const number = addnumber.substring(0, 1);
    if (number == '#') {
      addnumber = addnumber.substring(1);
    }
    if (address.trim() != '') {
      rta = String.Format('{0} # {1}', address, addnumber);
    } else {
      rta = addnumber;
    }
    return rta;
  }
  // getActivityDetail() {
  //   this.packageServices
  //     .ActivityDetails({
  //       customerId: this.customerId,
  //       activityId: this.activityId,
  //     })
  //     .pipe(
  //       finalize(() => {
  //         // this.sendPackageForm.markAsPristine();
  //         // this.isLoading = false;
  //       })
  //     )
  //     .subscribe(
  //       (r) => {
  //         this.addressInfoList = r.addressInfoList;
  //
  //         const result = this.distanceService.getMiddlePoint(this.addressInfoList);
  //         this.latitude = result.lat;
  //         this.longitude = result.lng;
  //         // this.agmMap.mapReady.subscribe((map: any) => {
  //         //
  //         this.bounds = new google.maps.LatLngBounds();
  //         for (const mm of this.addressInfoList) {
  //           this.bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
  //         }
  //         //   map.fitBounds(bounds);
  //         // });
  //
  //         // this.psList = r;
  //         // if (this.timer) {
  //         //   setTimeout(() => {
  //         //     this.getInfo();
  //         //   }, 5000);
  //         // }
  //       },
  //       (error) => {
  //         log.debug(`Registry error: ${error}`);
  //         this.error = error;
  //       }
  //     );
  // }
  mapReady(map: any) {
    if (this.addressInfoList) {
      const bounds = new google.maps.LatLngBounds();
      for (const mm of this.addressInfoList) {
        bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
      }
      map.fitBounds(bounds);
    }
  }
  shown(map: any) {
    if (this.addressInfoList) {
      const bounds = new google.maps.LatLngBounds();
      for (const mm of this.addressInfoList) {
        bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
      }
      map.fitBounds(bounds);
    }
  }
}
