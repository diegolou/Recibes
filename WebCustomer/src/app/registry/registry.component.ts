import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { PasswordValidation } from '@core/tools/password-validation';
import { finalize } from 'rxjs/operators';
import { Logger, LocationService } from '@core';
import { I18nService } from '@app/i18n';
import { UsersService } from '@requests';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { IdType, Country, State, City, PacAddress, Parameter } from '@entities';
import { ParametersService } from '@core/Requests';
import { MapsAPILoader } from '@agm/core';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { addressLigthValidator } from '@shared';
import { EmailValidation } from '@core/tools/email-validation';
import { stringify } from 'querystring';

const log = new Logger('Registry');
@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss'],
})
export class RegistryComponent implements OnInit {
  firstName: string;
  lastName: string;
  companyName: string;
  showMeIca = false;
  markedIca = false;
  showMeFuente = false;
  markedFuente = false;
  empresa: boolean = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  version: string = environment.version;
  error: string;
  registryForm: FormGroup;
  EmailValidationForm: FormGroup;
  isLoading = false;
  isCanceling = false;
  idTypeList: IdType[] = new Array(2);
  countriesList: Country[];
  statesList: State[];
  citiesList: City[];
  selectedCountry: string;
  selectedState: string;
  selectedCity: string;
  selectedIdType: string;
  infoTerminos: Parameter[];
  selectedtof: string;
  selAddress: PacAddress = new PacAddress();
  idNumber: string = '2222222222';
  // name = 'Angular';
  model: any = {};
  typeOfPerson = [
    { code: 'N/A', value: 'N/A', mask: 'N/A' },
    { code: 'NITPJ', value: 'NIT Persona Juridica', mask: '000.000.000' },
  ];
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder: any;
  getCurAddress: any;
  indexngAfter: number = 0;

  constructor(
    // private mapsAPILoader: MapsAPILoader,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    // private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private userServices: UsersService,
    private translateService: TranslateService,
    private parameterService: ParametersService,
    private location: LocationService // Servicio que se encarga de traer la información de la localizacion
  ) {
    this.idTypeList[0] = new IdType();
    this.idTypeList[0].id = 1;
    this.idTypeList[0].value = 'DNI';
    this.idTypeList[1] = new IdType();
    this.idTypeList[1].id = 2;
    this.idTypeList[1].value = 'Foreingn DNI';
    this.selectedCountry = null;
    this.selectedState = null;
    this.selectedCity = null;
    this.selectedIdType = null;
    // this.getCountries();
    this.getTerminos();
    this.createForm();
  }

  ngOnInit() {
    this.isLoading = false;
    // Función que se encarga de conseguir la posición del cliente.
    this.setCurrentLocation();
  }
  ngAfterViewInit(): void {
    this.indexngAfter++;
  }
  getCountries() {
    this.parameterService
      .getCountries()
      .pipe(finalize(() => {}))
      .subscribe(
        (countries) => {
          this.countriesList = countries.Countries;
        },
        (error) => {}
      );
  }
  /**
   *Función que a partir de una latitud y longitud se puede conseguir la
   *dirección de la misma
   *
   * @param {number} lat
   * @param {number} lng
   * @memberof RegistryComponent
   */
  getInfoLocation(lat: number, lng: number) {
    this.location
      .getInfoLocation(lat, lng)
      .then((r) => {
        Swal.fire({
          title: 'Dirección Actual',
          html: 'Su Dirección Actual es: ' + r.formattedaddress + '¿Desea Utilizar esta dirección?',
          width: '50%',
          showCancelButton: true,
          confirmButtonText: 'Utilizar',
          cancelButtonText: 'No utilizar',
          showClass: {
            popup: 'swal2-noanimation',
            backdrop: 'swal2-noanimation',
          },
          hideClass: {
            popup: '',
            backdrop: '',
          },
        }).then((result) => {
          if (result.value) {
            let seladdress: PacAddress;
            seladdress = this.location.setInfoPacAddress(seladdress, r, '1');
            this.registryForm.controls.pacinfo.setValue(seladdress);
          }
        });
      })
      .catch((error) => alert(error));
  }
  /**
   *Función que se encarga de traer la localización del cliente.
   *
   * @memberof RegistryComponent
   */
  setCurrentLocation() {
    this.location
      .getLocation()
      .then((r) => {
        this.getInfoLocation(r.lat, r.lng);
      })
      .catch((error) => alert(error));
  }

  onChangeState(val: any) {
    if (val != null) {
      this.selectedState = val;
      this.selectedCity = null;
      this.getCities(this.selectedCountry, val);
    }
  }

  getCities(countryC: string, stateC: string) {
    this.parameterService
      .getState(countryC, stateC)
      .pipe(finalize(() => {}))
      .subscribe(
        (cities) => {
          this.citiesList = cities.Cities;
        },
        (error) => {}
      );
  }
  getTerminos() {
    this.parameterService
      .getPametersByType('terminos')
      .pipe(finalize(() => {}))
      .subscribe((parameters) => {
        this.infoTerminos = parameters.Parameters;
      });
  }
  get f() {
    return this.registryForm.controls;
  }
  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.isLoading = false;

    this.registryForm = this.formBuilder.group({
      customertype: ['N/A'],
      idNumber: [{ value: '2222222222', disabled: false }, Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      companyName: ['N/A', Validators.required],
      mobileNumber: ['', Validators.required],
      terminos: ['', Validators.requiredTrue],
      pacinfo: ['', addressLigthValidator],
      autoReteICA: [''],
      autoReteFuente: [''],
      checkretefuente: [false],
      checkreteica: [false],
      EmailValidationForm: this.formBuilder.group(
        {
          eMail: [
            '',
            [
              Validators.required,
              Validators.pattern(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ),
              Validators.maxLength(50),
            ],
          ],
          ConfirmEmail: [
            '',
            [
              Validators.required,
              Validators.pattern(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ),
              Validators.maxLength(50),
            ],
          ],
        },
        {
          validator: EmailValidation.MatchEmail, // custom email
        }
      ),
      PasswordValidation: this.formBuilder.group(
        {
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        },
        {
          validator: PasswordValidation.MatchPassword, // custom validation
        }
      ),
    });
  }

  registry() {
    this.error = '';
    this.isLoading = true;
    log.info('ingreso a la funcionalidad de registro');
    const pacAddress: PacAddress = this.registryForm.value.pacinfo;
    this.userServices
      .Registry({
        idType: this.registryForm.value.customertype,
        idNumber: this.empresa ? Number(this.registryForm.value.idNumber) : Number(this.idNumber),
        firstName: this.empresa ? this.registryForm.value.companyName : this.registryForm.value.firstName,
        lastName: this.registryForm.value.lastName,
        mobile: Number(this.registryForm.value.mobileNumber.number),
        eMail: this.registryForm.value.EmailValidationForm.eMail,
        profile: 'customer',
        password: this.registryForm.value.PasswordValidation.password,
        terms: true,
        reteFuente: this.registryForm.value.checkretefuente,
        reteIca: this.registryForm.value.checkreteica,
        actaReteFuente: this.registryForm.value.autoReteFuente,
        actaReteIca: this.registryForm.value.autoReteICA,
        company: true,
        countryCode: 57,
        address: {
          id: '',
          address: pacAddress.address,
          adnumber: pacAddress.adnumber,
          city: pacAddress.city,
          country: pacAddress.country,
          details: pacAddress.details,
          formattedaddress: pacAddress.formattedaddress,
          instruccions: 'NA',
          latitude: pacAddress.lat,
          longitude: pacAddress.lng,
          name: 'Principal',
          postalCode: pacAddress.postalcode,
          state: pacAddress.state,
          type: pacAddress.type,
        },
      })
      .pipe(
        finalize(() => {
          this.registryForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (credentials) => {
          Swal.fire({
            title: this.translateService.instant('Customer registration'),
            html: this.translateService.instant('registry-message'),
            showClass: {
              popup: 'swal2-noanimation',
              backdrop: 'swal2-noanimation',
            },
            hideClass: {
              popup: '',
              backdrop: '',
            },
          });
          const navigationExtras: NavigationExtras = {
            state: {
              activate: true,
              customerId: this.registryForm.value.EmailValidationForm.eMail,
              profile: 'customer',
            },
          };
          this.router.navigate(['/activate'], navigationExtras);
          // this.route.queryParams.subscribe((params) => this.router.navigate(['/login'], { replaceUrl: true }));
        },
        (error) => {
          log.debug(`Registry error: ${error}`);
          this.error = error;
        }
      );
  }
  terminos(): any {
    Swal.fire({
      title: this.translateService.instant('Terminos y Codiciones'),
      html: this.infoTerminos[0].value,
      width: '90%',
      showCancelButton: true,
      // customClass: {
      //   confirmButton: 'saconfirmButton',
      // },
      confirmButtonText: this.translateService.instant('I agree'),
      cancelButtonText: this.translateService.instant('Cancel'),
      showClass: {
        popup: 'swal2-noanimation',
        backdrop: 'swal2-noanimation',
      },
      hideClass: {
        popup: '',
        backdrop: '',
      },
    }).then((result) => {
      if (result.value) {
        this.f.terminos.setValue(true);
      } else {
        this.f.terminos.setValue(false);
      }
    });
  }
  cancel() {
    this.isCanceling = true;
    this.router.navigate(['/home'], { replaceUrl: true });
    this.isCanceling = false;
  }
  clickcustomertype(val: boolean) {
    log.debug('Click type empresa:' + this.registryForm.value.idNumber);
    this.empresa = val;
    this.cdRef.detectChanges();

    if (this.empresa) {
      this.firstName = this.registryForm.value.firstName;
      this.registryForm.controls.firstName.setValue('N/A');
      this.lastName = this.registryForm.value.lastName;
      this.registryForm.controls.lastName.setValue('N/A');
      this.registryForm.controls.companyName.setValue(this.companyName != 'N/A' ? this.companyName : '');
    } else {
      this.registryForm.controls.firstName.setValue(this.firstName != 'N/A' ? this.firstName : '');
      this.registryForm.controls.lastName.setValue(this.lastName != 'N/A' ? this.lastName : '');
      this.companyName = this.registryForm.value.companyName;
      this.registryForm.controls.companyName.setValue('N/A');
    }
  }

  isReteICA(e: any) {
    this.markedIca = e.target.checked;
  }
  isReteFuente(e: any) {
    this.markedFuente = e.target.checked;
  }
}
