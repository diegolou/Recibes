import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TypeOfPerson, Parameter, InfoCustomer } from '@entities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { I18nService } from '@app/i18n';
import { addressLigthValidator } from '@shared';
import { Logger } from '@core';
import { UsersService } from '@requests';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { CredentialsService } from '@app/auth';

const log = new Logger('UpdateCustomer');

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss'],
})
export class UpdateInfoComponent implements OnInit {
  _typeofperson: TypeOfPerson;
  infoCustomer: InfoCustomer;
  isLoading = false;
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  isCanceling = false;
  showMeIca = false;
  markedIca = false;
  showMeFuente = false;
  markedFuente = false;
  error: string;
  addressId: string;

  constructor(
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private translateService: TranslateService,
    private credentialsService: CredentialsService
  ) {
    this.createFormGen();
  }
  registryForm: FormGroup;
  // typeofperson: TypeOfPerson;
  TypeOfPesronList: Array<TypeOfPerson> = new Array<TypeOfPerson>();

  ngOnInit(): void {
    this.toTypeOfPerson();
    this.getInfoCustomer();
  }
  getInfoCustomer() {
    if (this.route.snapshot.data['infocustomer']) {
      this.infoCustomer = this.route.snapshot.data['infocustomer'][0];
      log.debug(this.infoCustomer.firstName + ' ' + this.infoCustomer.lastName);

      //Se valida la información
      //tipo identificación
      if (this.infoCustomer.idType != 'N/A') {
        this.registryForm.controls.typeOfPerson.setValue(this.infoCustomer.idType);
        this._typeofperson = this.TypeOfPesronList.find((r) => r.code == this.infoCustomer.idType);
      }
      this.f.idNumber.setValue(
        this.infoCustomer.idNumber.toString() != '2222222222' ? this.infoCustomer.idNumber.toString() : ''
      );
      this.f.firstName.setValue(this.infoCustomer.firstName);
      if (this.infoCustomer.idType == 'NITPJ') {
        this.registryForm.controls.typeOfPerson.disable();
      } else {
        this.f.lastName.setValue(this.infoCustomer.lastName);
      }
      if (this.infoCustomer.addressInfoList.length > 0) {
        const addresstemp = this.infoCustomer.addressInfoList.find((x) => x.name == 'Principal');
        this.addressId = addresstemp.id;
        this.f.pacinfo.setValue(addresstemp);
      }
      this.f.mobileNumber.setValue(this.infoCustomer.mobile.toString());
      this.markedFuente = this.infoCustomer.retefuente;
      this.f.reteFuente.setValue(this.infoCustomer.retefuente);
      if (this.infoCustomer.retefuente) {
        this.f.actaReteFuente.setValue(this.infoCustomer.actaReteFuente);
      }
      this.markedIca = this.infoCustomer.reteIca;
      this.f.reteIca.setValue(this.infoCustomer.reteIca);
      if (this.infoCustomer.reteIca) {
        this.f.actaReteICA.setValue(this.infoCustomer.actaReteIca);
      }
    } else {
      this.router.navigate(['/infopage']);
    }
  }
  toTypeOfPerson() {
    if (this.route.snapshot.data['idtype']) {
      const temporal = this.route.snapshot.data['idtype'];
      temporal.Parameters.forEach((r: Parameter) => {
        let reg = new TypeOfPerson();
        reg.code = r.id;
        reg.name = r.value;
        reg.googleMapCP = r.valueAdd;
        reg.mask = r.valueAdd2;
        this.TypeOfPesronList.push(reg);
      });
    } else {
      this.router.navigate(['/infopage']);
    }
  }
  onTypeOfPersonChange(typePerson: TypeOfPerson) {
    this._typeofperson = typePerson;
  }
  setLanguage(language: string) {
    this.i18nService.language = language;
  }
  private createFormGen() {
    this.isLoading = false;
    this.registryForm = this.formBuilder.group({
      typeOfPerson: [''],
      idNumber: [{ value: '2222222222' }, Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      pacinfo: ['', addressLigthValidator],
      mobileNumber: ['', Validators.required],
      actaReteFuente: [''],
      actaReteICA: [''],
      reteFuente: [false],
      reteIca: [false],
    });
  }

  Update() {
    this.error = '';
    this.isLoading = true;
    let addressInfotemp = this.fv.pacinfo;
    addressInfotemp.id = this.addressId;
    this.usersService
      .UpdateCustomer({
        idType: this.fv.typeOfPerson
          ? this.fv.typeOfPerson.code
            ? this.fv.typeOfPerson.code
            : this.fv.typeOfPerson
          : this._typeofperson.code,
        idNumber: Number(this.fv.idNumber),
        firstName: this.fv.firstName,
        lastName: this.fv.lastName,
        profile: 'customer',
        eMail: this.userId,
        mobile: Number(this.fv.mobileNumber.number),
        reteFuente: this.fv.reteFuente,
        reteIca: this.fv.reteIca,
        actaReteFuente: this.fv.actaReteFuente,
        actaReteIca: this.fv.actaReteICA,
        company: true,
        countryCode: 57,
        addressesInfo: addressInfotemp,
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
            title: this.translateService.instant('Customer Update'),
            html: this.translateService.instant('updatecustomer-message'),
            showClass: {
              popup: 'swal2-noanimation',
              backdrop: 'swal2-noanimation',
            },
            hideClass: {
              popup: '',
              backdrop: '',
            },
          });
          this.router.navigate(['/home']);
          // this.route.queryParams.subscribe((params) => this.router.navigate(['/login'], { replaceUrl: true }));
        },
        (error) => {
          log.debug(`Registry error: ${error}`);
          this.error = error;
        }
      );
  }

  // get hideDigit() {
  //   let rta: boolean;
  //   if (this.typeofperson) {
  //     switch (this.typeofperson.code) {
  //       case 'NITPN':
  //         rta = false;
  //         break;
  //       case 'NITPE':
  //         rta = false;
  //         break;
  //       case 'NITPJ':
  //         rta = false;
  //         break;
  //       default:
  //         rta = true;
  //     }
  //   } else {
  //     rta = true;
  //   }
  //   return rta;
  // }

  get isCompany() {
    let rta: boolean;
    if (this._typeofperson) {
      switch (this._typeofperson.code) {
        case 'NITPJ':
          rta = true;
          break;
        default:
          rta = false;
      }
    } else {
      rta = false;
    }
    return rta;
  }
  get f() {
    return this.registryForm.controls;
  }
  get fv() {
    return this.registryForm.value;
  }
  get infoTypeofPerson(): TypeOfPerson {
    let rta = new TypeOfPerson();
    if (this._typeofperson) {
      rta = this._typeofperson;
    }
    return rta;
  }
  cancel() {
    // alert(this.getDigitVerif(this.registryForm.value.PersonId));
    this.isCanceling = true;
    this.router.navigate(['/home'], { replaceUrl: true });
    this.isCanceling = false;
  }
  // getDigitVerif(Nit: string) {
  //   let Residuo: number = 0;
  //   let Acumulador: number = 0;
  //   let Vector: number[] = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];

  //   for (let i = 0; i < Nit.length; i++) {
  //     Acumulador = Acumulador + Number(Nit[Nit.length - 1 - i].toString()) * Vector[i];
  //   }

  //   Residuo = Acumulador % 11;
  //   if (Residuo > 1) return (11 - Residuo).toString();

  //   return Residuo.toString();
  // }
  // onKey(xy: string) {
  //   let x = this.getDigitVerif(this.registryForm.controls.PersonId.value);

  //   this.registryForm.controls.verifdigitid.setValue(x);
  // }
  isReteICA(e: any) {
    this.markedIca = e.target.checked;
  }
  isReteFuente(e: any) {
    this.markedFuente = e.target.checked;
  }
  get userName(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.usernamedescrip : null;
  }

  get userId(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.userid : null;
  }
}
