import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Logger, OdistanceService, TarifaService } from '@core';
import { TranslateService } from '@ngx-translate/core';
import { RatesService } from '@core/Requests';
import { CredentialsService } from '@app/auth';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { adminAddressValidator } from '@shared';

import { Payment_Status, Payment_Features } from '@enum';
import {
  AddressInfo,
  PacAddress,
  DistanceTimeTotalInfo,
  PackageInfo,
  PaymentReq,
  Costdetail,
  ActiveCity,
  TarifaInfo,
  AddressAdmin,
  PaymentDetail,
  Rates,
  Holiday,
} from '@entities';
import { PackageService } from '@requests';
import Swal from 'sweetalert2';
import * as _moment from 'moment';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { triggerAsyncId } from 'async_hooks';

// import {} from '@requests' ;

const log = new Logger('SendPackage');

@Component({
  selector: 'app-sendpackage',
  templateUrl: './sendpackage.component.html',
  styleUrls: ['./sendpackage.component.scss'],
})
export class SendpackageComponent implements OnInit {
  bounds: any;
  active: 1;
  disabled = true;
  disablednext = false;
  panelDatos = true;
  panelInfo = false;
  panelPago = false;
  latitude: number = 4.734295;
  longitude: number = -74.0375782;
  zoom: number = 13;
  error: string;
  formattedaddress: string;
  tpartofday: string = '';
  isLoading = false;
  isCanceling = false;
  addressAdmin: AddressAdmin;
  addressList: Array<PacAddress> = new Array<PacAddress>();
  infoDistancia: DistanceTimeTotalInfo;
  tarifaInfo: TarifaInfo;
  sendPackageForm: FormGroup;
  transporte: PackageInfo;
  packageList: Array<PackageInfo>;
  holidayList: Array<Holiday>;
  city: ActiveCity;
  cityList: Array<ActiveCity>;
  OriAdressId: string = '1';
  DestAdressId: string = '2';
  tip: number = 0;
  insuredValue: number = 0;

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private packageServices: PackageService,
    private credentialsService: CredentialsService,
    private mapsAPILoader: MapsAPILoader,
    private distanceService: OdistanceService,
    private tarifaservices: TarifaService,
    private rateServices: RatesService
  ) {
    this.createForm();
    this.infoDistancia = new DistanceTimeTotalInfo();
    this.infoDistancia.totalDistance = 0;
    this.infoDistancia.totalDuration = 0;
    this.tarifaInfo = new TarifaInfo();
    this.tarifaInfo.valorTotal = 0;
    this.transporte = null;
  }

  ngOnInit(): void {
    this.cityList = this.route.snapshot.data['cityList'];
    this.holidayList = this.route.snapshot.data['holidayList'];
    // this.packageList = this.route.snapshot.data['packageType'];
    this.mapsAPILoader.load().then(() => {});
    // this.agmMap.triggerResize();
  }
  /**
   *
   *
   * @param {Array<PacAddress>} list
   * @return {*}  {Array<AddressInfo>}
   * @memberof SendpackageComponent
   */
  createAddressInfoArray(list: Array<PacAddress>): Array<AddressInfo> {
    let listAddress: Array<AddressInfo> = Array<AddressInfo>();
    list.forEach((r) => {
      const item = new AddressInfo();
      item.Address = r.address;
      item.Adnumber = r.adnumber;
      item.City = r.city;
      item.Country = r.country;
      item.Details = r.details;
      item.Instruccions = r.Instruccions;
      item.Lat = r.lat;
      item.Lng = r.lng;
      item.Name = '';
      item.PostalCode = r.postalcode;
      item.State = r.state;
      item.Type = r.type;
      item.formattedaddress = r.formattedaddress;
      item.Id = r.id;
      listAddress.push(item);
    });
    return listAddress;
  }
  createInfoPayment(): PaymentReq {
    let payment = new PaymentReq();
    payment.Payment_Type = this.getPaymentType();
    payment.Error_Reason = '';
    payment.Error_type = '';
    payment.Payment_Acceptance_Token = '';
    payment.Payment_Cuotas = 0;
    payment.Payment_Currency = 'COL';
    payment.Payment_Reference = 'Pago servicio';
    (payment.Payment_Feature = Payment_Features.Activity), (payment.Payment_Status = Payment_Status.PENDING);
    payment.Payment_Token = '';
    payment.Payment_source_id = 0;
    return payment;
  }

  getPaymentType() {
    return this.f.paymenttype.value;
  }
  /**
   *
   *
   * @return {*}  {PaymentDetail}
   * @memberof SendpackageComponent
   */
  createPaymentDatail(): PaymentDetail {
    let pdetail = new PaymentDetail();
    // pdetail.baseRate = this.transporte.tarifa_ini;
    pdetail.baseRate = this.tarifaInfo.tarifaBase;
    pdetail.datePayment = _moment.utc().toDate();
    pdetail.distSurcharge = this.tarifaInfo.recargoDistancia;
    pdetail.hSurcharge = this.tarifaInfo.recargofestivo;
    pdetail.insuranceValue = this.insuredValue;
    // pdetail.ivSurcharge = this.transporte.tarife_sec;
    pdetail.nSurcharge = this.tarifaInfo.recargoNocturno;
    pdetail.sSurcharge = this.tarifaInfo.recargoParadas;
    pdetail.scitySurcharge = 0;
    pdetail.tax = 0;
    const tipv = this.tip ? this.tip : '0';
    pdetail.tip = Number(tipv);
    pdetail.total = this.tarifaInfo.valorTotal;
    return pdetail;
  }
  // createPaymentDetail(){}
  /**
   *
   *
   * @memberof SendpackageComponent
   */
  sendPackage() {
    this.isLoading = true;
    // se crea el arreglo que se va aenviar al servicio con la informacion
    // de las direcciones
    // alert('Envio Paquete');

    const CountryCode = this.addressAdmin.PacAddressList[0].country;
    this.packageServices
      .sendPackage({
        CustomerId: this.userId,
        Remark: 'NA',
        AddressesInfo: this.createAddressInfoArray(this.addressAdmin.PacAddressList),
        payment: this.createInfoPayment(),
        paymentDetail: this.createPaymentDatail(),
        paymentId: this.getIdTransaction(CountryCode),
        totalDistance: this.infoDistancia.totalDistance,
      })
      .pipe(
        finalize(() => {
          this.sendPackageForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (response) => {
          // Swal.fire({
          //   title: this.translateService.instant('Send Package'),
          //   text: this.translateService.instant('The package delivery request was successfully registered.'),
          //   showClass: {
          //     popup: 'swal2-noanimation',
          //     backdrop: 'swal2-noanimation',
          //   },
          //   hideClass: {
          //     popup: '',
          //     backdrop: '',
          //   },
          // });
          debugger;
          const navigationExtras: NavigationExtras = {
            state: {
              reference: response[0].reference,
              paymentId: response[0].paymentId,
              totalP: response[0].totalP,
              paymentT: response[0].paymentT,
              taxes: response[0].taxes,
              origen: response[0].origen,
            },
          };
          this.route.queryParams.subscribe((params) => this.router.navigate(['/payments/payment'], navigationExtras));
        },
        (error) => {
          log.debug(`Registry error: ${error}`);
          this.error = error;
        }
      );
  }
  // viewDetail(activityId: string) {
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       activityId: activityId,
  //       customerId: this.userId,
  //     },
  //   };
  //   this.router.navigate(['/package/activitydetail'], navigationExtras);
  // }
  cancel() {}
  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.usernamedescrip : null;
  }
  get userId(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.userid : null;
  }
  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address;
  }

  procesacontrol($event: any, index: number) {
    alert('Latitude :' + $event.lat + ' Longitude : ' + $event.lng + ' Index : ' + index);
  }
  getIdTransaction(country: string): string {
    return country + _moment().utc().format('YYYYMMDDHHmmssSSS');
    // return country + this.datePipe.transform(aux, 'yyyyMMddHHmmssSSS');
  }
  changeAddress(event: AddressAdmin) {
    log.debug('Evento changeAddress');
    this.addressAdmin = event;
    log.info(this.addressAdmin.Validador);
    this.getDistanciaTarifa(1);

    const result = this.distanceService.getMiddlePoint(this.addressAdmin.PacAddressList);

    this.latitude = result.lat;
    this.longitude = result.lng;
    this.bounds = new google.maps.LatLngBounds();
    for (const mm of this.addressAdmin.PacAddressList) {
      this.bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
    }
  }
  /**
   *
   *
   * @private
   * @memberof SendpackageComponent
   */
  private getDistanciaTarifa(origen: number) {
    let ejecucion = false;
    log.info(
      'this.f.city.valid=' +
        this.f.city.valid +
        ',this.f.transport.valid=' +
        this.f.transport.valid +
        ',this.f.adminaddress.valid=' +
        this.f.adminaddress.valid
    );
    if (!this.addressAdmin) {
      return;
    }
    switch (origen) {
      case 1:
        if (this.f.city.valid && (this.f.adminaddress.valid || this.addressAdmin.Validador)) {
          ejecucion = true;
        }
        break;
      default:
        if (this.f.city.valid && this.f.transport.valid && (this.f.adminaddress.valid || this.addressAdmin.Validador)) {
          ejecucion = true;
        }
        break;
    }
    if (ejecucion) {
      log.info('Pudo Ingresar a la validación');
      this.distanceService
        .getDistance(this.addressAdmin.PacAddressList, this.transporte.tp_name)
        .then((result: any) => {
          this.infoDistancia = result.results;
          const fecha = _moment();
          this.tarifaInfo = this.tarifaservices.getTarifa(
            this.infoDistancia,
            this.transporte,
            this.holidayList,
            { code: 1001, name: 'Basico', value: 10000, description: 'Plan Basico Sin Descuento', descuento: 0 },
            fecha.toDate()
          );
          this.tarifaInfo.valorTotal = this.tarifaInfo.valorTotal + Number(this.tip);
        });
    }
  }

  /**
   *
   *
   * @private
   * @memberof SendpackageComponent
   */
  private createForm() {
    this.isLoading = false;
    this.isCanceling = false;
    this.sendPackageForm = this.formBuilder.group({
      city: ['', Validators.required],
      transport: ['', Validators.required],
      adminaddress: ['', adminAddressValidator],
      paymenttype: ['efectivo'],
    });
  }
  /**
   *
   *
   * @readonly
   * @memberof SendpackageComponent
   */
  get f() {
    return this.sendPackageForm.controls;
  }
  /**
   *
   *
   * @return {*}
   * @memberof SendpackageComponent
   */
  partofday() {
    const fecha = new Date();
    let value = '';
    if (fecha.getHours() < 12) {
      value = this.translateService.instant('Good morning');
    } else if (fecha.getHours() > 12 && fecha.getHours() < 19) {
      value = this.translateService.instant('Good afternoon');
    } else {
      value = this.translateService.instant('Good evening');
    }
    return value;
  }
  onTransportChange(val: PackageInfo) {
    this.transporte = val;
    // if (this.city) {
    //   this.getRate(val.code.toString(), this.city.lgCode);
    // }
    this.getDistanciaTarifa(1);
  }

  getRate(city: string) {
    this.packageList = null;
    this.rateServices
      .GetPackageRate(city)
      .pipe(finalize(() => {}))
      .subscribe((rate) => {
        this.packageList = rate;
      });
  }
  onCityChange(val: ActiveCity) {
    this.city = val;
    this.getRate(val.lgCode);
  }

  onPagar() {
    this.panelDatos = false;
    this.panelInfo = false;
    this.panelPago = true;
  }
  onDateCD(val: Costdetail) {
    this.tip = val.tip;
    this.insuredValue = val.insuredvalue;
    this.getDistanciaTarifa(2);
  }

  onNext() {
    this.panelDatos = false;
    this.panelInfo = true;
    this.panelPago = false;
  }
  onBack() {
    this.panelDatos = true;
    this.panelInfo = false;
    this.panelPago = false;
  }
  onBackinfo() {
    this.panelDatos = false;
    this.panelInfo = true;
    this.panelPago = false;
  }
  pagar() {
    alert('Inicia proceso de pago definitivo');
  }
}
