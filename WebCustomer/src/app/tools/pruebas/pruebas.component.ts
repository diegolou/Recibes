import { ComponentFactoryResolver, Type, ViewContainerRef, Component, OnInit, ViewChild, Input } from '@angular/core';
import { CryptoService } from '@core';
import { environment } from '@env/environment';
import { IdType, Country, State, City } from '@app/Entities';
import { ParametersService } from '@core/Requests/Parameters/parameters.service';
import { finalize } from 'rxjs/operators';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { TipoServicio } from '@app/Entities/TipoServicio';
import { PacAddress } from '@app/Entities/pacaddress';
import { Guid } from 'guid-typescript';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
const short = require('short-uuid');

declare var WidgetCheckout: any;

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss'],
})
export class PruebasComponent implements OnInit {
  guidId: Guid;
  referenciaId: string;
  // WidgetCheckout : any
  // @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  // powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  // model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  // value: string;
  // crypto: any;
  // selectedCountry: string;
  // selectedState: string;
  // selectedCity: string;
  // submitted = false;
  // idTypeList: IdType[] = new Array(2);
  // countriesList: Country[];
  // statesList: State[];
  // citiesList: City[];
  // formulario: FormGroup;
  // isLinear = false;
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // thirdFormGroup: FormGroup;
  // selectedTypoServicio: TipoServicio;

  // OriAdressId: string = '1';
  // DestAdressId: string = '2';
  // pacAddress: PacAddress[];

  // lat = 0;
  // lng = 0;
  // getAddress: any;
  // zoom: any;

  // formattedaddress = ' ';
  // options = {
  //   componentRestrictions: {
  //     country: ['CO'],
  //   },
  // };

  // get experienciaLaboral(): FormArray {
  //   return this.formulario.get('experienciaLaboral') as FormArray;
  // }

  constructor(
    // private cryptoService: CryptoService,
    // private parameterService: ParametersService,
    // private fb: FormBuilder,
    // private _formBuilder: FormBuilder,
    // private apiloader: MapsAPILoader,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.idTypeList[0] = new IdType();
    // this.idTypeList[0].id = 1;
    // this.idTypeList[0].value = 'DNI';
    // this.idTypeList[1] = new IdType();
    // this.idTypeList[1].id = 2;
    // this.idTypeList[1].value = 'Foreingn DNI';
    // this.selectedCountry = null;
    // this.selectedState = null;
    // this.selectedCity = null;
    // this.getCountries();
  }

  ngOnInit() {
    //   this.crearFormulario();
    //   this.anadirExperienciaLaboral();
    //   this.get();
    //   this.zoom = 16;
    //   this.firstFormGroup = this._formBuilder.group({
    //     firstCtrl: ['', Validators.required],
    //   });
    //   this.secondFormGroup = this._formBuilder.group({
    //     secondCtrl: ['', Validators.required],
    //   });
    //   this.thirdFormGroup = this._formBuilder.group({
    //     thirdCtrl: ['', Validators.required],
    //   });
    // }
    // ngAfterViewInit(): void {
    //   setTimeout(() => {
    //     console.log('Resizing');
    //     // this.agmMap.triggerResize();
    //   }, 100);
  }
  // get() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: Position) => {
  //       if (position) {
  //         this.lat = position.coords.latitude;
  //         this.lng = position.coords.longitude;
  //         this.getAddress = (this.lat, this.lng);

  //         this.apiloader.load().then(() => {
  //           let geocoder = new google.maps.Geocoder();
  //           let latlng = {
  //             lat: this.lat,
  //             lng: this.lng,
  //           };
  //           geocoder.geocode(
  //             {
  //               location: latlng,
  //             },
  //             function (results: any) {
  //               if (results[0]) {
  //                 this.currentLocation = results[0].formatted_address;
  //                 console.log(this.currentLocation);
  //               } else {
  //                 console.log('Not found');
  //               }
  //             }
  //           );
  //         });
  //       }
  //     });
  //   }
  // }
  // procesaPropagar(event: TipoServicio) {
  //   this.selectedTypoServicio = event;
  // }
  // mapClicked(latitude: any, longitude: any) {
  //   // const latitude = $event.coords.lat;
  //   //     const longitude = $event.coords.lng;
  //   this.apiloader.load().then(() => {
  //     let geocoder = new google.maps.Geocoder();
  //     let latlng = {
  //       lat: latitude,
  //       lng: longitude,
  //     };
  //     geocoder.geocode(
  //       {
  //         location: latlng,
  //       },
  //       function (results: any) {
  //         if (results[0]) {
  //           this.currentLocation = results[0].formatted_address;
  //           console.log(this.currentLocation);
  //           alert(this.currentLocation);
  //         } else {
  //           console.log('Not found');
  //         }
  //       }
  //     );
  //   });
  // }

  // public AddressChange(address: any) {
  //   //setting address from API to local variable
  //   this.formattedaddress = address.formatted_address;
  // }
  // crearFormulario() {
  //   this.formulario = this.fb.group({
  //     experienciaLaboral: this.fb.array([]),
  //   });
  // }
  // cancel() {
  //   /*this.isCanceling = true;
  //   this.router.navigate(['/home'], { replaceUrl: true });
  //   this.isCanceling = false;
  //   */
  // }
  // registry() {}

  // anadirExperienciaLaboral() {
  //   const trabajo = this.fb.group({
  //     empresa: new FormControl(''),
  //     puesto: new FormControl(''),
  //     descripcion: new FormControl(''),
  //   });

  //   this.experienciaLaboral.push(trabajo);
  // }

  // borrarTrabajo(indice: number) {
  //   this.experienciaLaboral.removeAt(indice);
  // }

  agregarAddMap() {}

  // encriptar() {
  //   this.crypto = this.cryptoService.encrypt(this.value, environment.cryptoKey);
  // }

  // desencriptar() {
  //   this.crypto = this.cryptoService.decrypt(this.value, environment.cryptoKey);
  // }

  // getCountries() {
  //   this.parameterService
  //     .getCountries()
  //     .pipe(
  //       finalize(() => {
  //         // this.registryForm.markAsPristine();
  //         // this.isLoading = false;
  //       })
  //     )
  //     .subscribe(
  //       (countries) => {
  //         this.countriesList = countries.Countries;
  //       },
  //       (error) => {
  //         // log.debug(`Registry error: ${error}`);
  //         // this.error = error;
  //       }
  //     );
  // }
  // onChangeCountry(val: any) {
  //   this.selectedCountry = val;
  //   this.selectedState = null;
  //   this.selectedCity = null;
  //   this.getStates(val);
  //   this.citiesList = null;
  // }

  // getStates(code: string) {
  //   this.parameterService
  //     .getCountry(code)
  //     .pipe(
  //       finalize(() => {
  //         // this.registryForm.markAsPristine();
  //         // this.isLoading = false;
  //       })
  //     )
  //     .subscribe(
  //       (states) => {
  //         this.statesList = states.States;
  //       },
  //       (error) => {
  //         // log.debug(`Registry error: ${error}`);
  //         // this.error = error;
  //       }
  //     );
  // }

  // onChangeState(val: any) {
  //   this.selectedState = val;
  //   this.selectedCity = null;
  //   this.getCities(this.selectedCountry, val);
  // }

  // getCities(countryC: string, stateC: string) {
  //   this.parameterService
  //     .getState(countryC, stateC)
  //     .pipe(
  //       finalize(() => {
  //         // this.registryForm.markAsPristine();
  //         // this.isLoading = false;
  //       })
  //     )
  //     .subscribe(
  //       (cities) => {
  //         this.citiesList = cities.Cities;
  //       },
  //       (error) => {
  //         // log.debug(`Registry error: ${error}`);
  //         // this.error = error;
  //       }
  //     );
  // }
  // procesacontrol($event: any, index: number) {
  //   this.pacAddress.push($event);
  // }
  clic() {
    var checkout = new WidgetCheckout({
      currency: 'COP',
      amountInCents: 3000000,
      // reference: 'AD002901221',
      reference: this.getReference(),
      // publicKey: 'pub_fENJ3hdTJxdzs3hd35PxDBSMB4f85VrgiY3b6s1',
      publicKey: 'pub_test_lNSFROTf1ptEYgxhR1c5lrRc66JngUfn',
      //redirectUrl: 'https://transaction-redirect.wompi.co/check', // Opcional
    });

    checkout.open(function (result: any) {
      var transaction = result.transaction;
      console.log('Transaction ID: ', transaction.id);
      debugger;
      console.log('Transaction object: ', transaction);
    });
  }

  clicGuid() {
    // this.guidId = Guid.create();
    this.guidId = short.generate();
    this.referenciaId = btoa(this.guidId.toString());
  }

  getReference(): string {
    const guidId = Guid.create();
    return btoa(guidId.toString());
  }

  clicPayment() {
    const navigationExtras: NavigationExtras = {
      state: {
        activityId: 'dsfdsfdsfds',
        reference: this.getReference(),
        paymentId: 'ddddfdfsdfsdfsdf',
        totalP: 100000,
        paymentT: 'Wampi',
        taxes: 0,
        origen: 'SendPackage',
      },
    };
    this.route.queryParams.subscribe((params) => this.router.navigate(['/payments/payment'], navigationExtras));
  }

  clicPaymentNo() {
    this.route.queryParams.subscribe((params) => this.router.navigate(['/payments/payment']));
  }
}
