import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { addressValidator } from '@shared';
import { PacAddress, InfoCustomer } from '@entities';
import { LocationService, Logger } from '@core';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { UsersService, infoCustomerResponse } from '@requests';
import * as _moment from 'moment';

import { Router, NavigationExtras } from '@angular/router';
// import {PacksgeCityResolverService} from '@resolver';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { finalize } from 'rxjs/operators';

const log = new Logger('PruebaPanel');
@Component({
  selector: 'app-pruebapanel',
  templateUrl: './pruebapanel.component.html',
  styleUrls: ['./pruebapanel.component.scss'],
})
export class PruebapanelComponent implements OnInit, AfterViewInit {
  addressForm: FormGroup;
  // hidden: boolean;
  latitude: number;
  longitude: number;
  latitudeP: number;
  longitudeP: number;
  seladdress: PacAddress;
  getCurAddress: any;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  fechautc: string;
  constructor(
    private location: LocationService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private us: UsersService
  ) {
    // this.hidden = true;
    this.addressForm = this.fb.group({
      pacaddress: ['', [Validators.required, addressValidator]],
    });
    // this.addpacAddress();
    // this.addpacAddress();
    // this.hidden = true;
    this.setCurrentLocation();
  }
  get f() {
    return this.addressForm.controls;
  }
  // get addressList(): FormArray {
  //   return this.addressForm.get('addressList') as FormArray;
  // }
  // newAddress(): FormGroup {
  //   return this.fb.group({
  //     pacaddress: ['', [Validators.required, addressValidator]],
  //   });
  // }
  // addpacAddress() {
  //   this.addressList.push(this.newAddress());
  // }

  // deleteAddress(id: any) {
  //   this.addressList.removeAt(Number(id));
  // }

  onSubmit() {
    console.log(this.addressForm.value);
  }

  // validHiddencontrol(id: number): boolean {
  //   return id < 2 ? true : false;
  // }

  ngOnInit(): void {
    // this.location
    //   .getLocation()
    //   .then((r) => {
    //     this.latitudeP = r.lat;
    //     this.longitudeP = r.lng;
    //     this.getinfolocation();
    //   })
    // //   .catch((error) => alert(error));
    // let aux = _moment().utc();
    // this.fechautc = this.datePipe.transform(aux, 'yyyyMMddHHmmssSSS');
    // alert(this.fechautc + ' ' + _moment.utc().format('YYYYMMDDHHmmssSSS'));
  }

  ngAfterViewInit(): void {}

  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getCurAddress = (this.latitude, this.longitude);
        } else {
          console.log('Not found');
        }
      });
    }
  }
  getinfolocation() {
    this.location
      .getInfoLocation(this.latitudeP, this.longitudeP)
      .then((r) => {
        // alert(r.formatted_address) ;

        this.seladdress = this.location.setInfoPacAddress(this.seladdress, r, '1');
        // alert(this.seladdress.formatted_address) ;
        // this.f.pacaddres.setValue(this.seladdress) ;
        this.addressForm.controls.pacaddress.setValue(this.seladdress);
      })
      .catch((error) => alert(error));
    // let geocoder = new google.maps.Geocoder();
    // let latlng = {
    //   lat: this.latitudeP,
    //   lng: this.longitudeP,
    // };
    // geocoder.geocode(
    //   {
    //     location: latlng,
    //   },
    //   function (results: any, status : any) {
    //     if (results[0]) {
    //
    //       this.currentLocation = results[0].formatted_address;
    //       // alert(this.currentLocation);
    //
    //       if (!this.selAddress) {
    //         this.selAddress = new PacAddress();
    //       }
    //       // this.setInfoPacAddress(this.selAddress, results[0].address_components);
    //
    //       // this.registryForm.control.pacinfo.value = this.selAddress;
    //       // this.customerAddress.setValue = this.currentLocation;
    //       // alert(results[0].address_components[0].short_name);
    //       // alert(results[0].address_components[0].long_name);
    //       /*for (let i=0; i < results[0].address_components[0].postcode_localities.length; i++)
    //       alert (results[0].address_components[0].postcode_localities[i]);
    //       alert (results[0].address_components[0].types[0]);
    //       */

    //
    //       //console.log(this.currentLocation);
    //       // alert(this.currentLocation + ' SetCurrnetLocation');
    //     } else {
    //       console.log('Not found');
    //     }
    //   }
    // );
  }
  routerOk() {
    const navigationExtras: NavigationExtras = {
      state: {
        activate: true,
        customerId: 'lujoboan@outlook.com',
        profile: 'customer',
      },
    };
    this.router.navigate(['/activate'], navigationExtras);
  }
  routerError() {
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     activate: true
    //   }
    // };
    this.router.navigate(['/activate']);
  }
  generatePdf() {
    const fontDescriptors = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf',
      },
    };

    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition, {}, fontDescriptors, pdfFonts.pdfMake.vfs).open();
  }
  click() {
    this.us
      .GetCustomerInfo({ customerId: 'lujoboan@outlook.com', profile: 'customer' })
      .pipe(finalize(() => {}))
      .subscribe(
        (r: any) => {
          if (r.length > 0) {
            let v: InfoCustomer;
            v = r[0];
            log.debug(v.firstName + ' ' + v.lastName);
          }
        },
        (error) => {
          log.error(error);
        }
      );
  }
}
