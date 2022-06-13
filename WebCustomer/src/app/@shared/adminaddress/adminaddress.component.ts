import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  ComponentFactoryResolver,
  Type,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
  Output,
  Input,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { PacAddressComponent } from '../pac-address/pac-address.component';
import { PacAddress, AddressAdmin } from '@entities';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
// import { PackageService } from '@app/@core/Requests';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Logger, ArrayHelper } from '@core';
import { addressValidator } from '../pac-address/pac-address.validators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 *
 *
 * @export
 * @class AdminaddressComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 * @implements {AfterViewChecked}
 */
@Component({
  selector: 'app-adminaddress',
  templateUrl: './adminaddress.component.html',
  styleUrls: ['./adminaddress.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminaddressComponent),
      multi: true,
    },
  ],
})
export class AdminaddressComponent implements OnInit, AfterViewInit, AfterViewChecked, ControlValueAccessor {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  // hidden: boolean;
  addressForm: FormGroup;
  latitude: number;
  longitude: number;
  idcontrol: string;
  validAddAddress = false;
  idayvuelta: boolean = false;
  // components: Array<any> = new Array();
  // PacAddressList: Array<PacAddress> = new Array();
  addressAdmin: AddressAdmin;

  // pacAddressComponent = PacAddressComponent;

  /**
   *
   *
   * @memberof AdminaddressComponent
   */
  @Output() onDataChange = new EventEmitter<AddressAdmin>();

  // writeValue(value: any): void {

  // }

  /**
   * Creates an instance of AdminaddressComponent.
   * @param {ComponentFactoryResolver} componentFactoryResolver
   * @param {ChangeDetectorRef} cdRef
   * @param {TranslateService} translateService
   * @param {FormBuilder} fb
   * @memberof AdminaddressComponent
   */
  constructor(
    // private componentFactoryResolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private fb: FormBuilder
  ) {
    // this.hidden = true;
    this.createForm();
    this.addpacAddress();
    this.addpacAddress();
    // this.hidden = false;
  }

  ngOnInit(): void {}
  ngAfterViewInit() {}
  /**
   *
   *
   * @type {boolean}
   * @memberof AdminaddressComponent
   */
  public isDisabled: boolean;
  /**
   *
   *
   * @param {*} _
   * @memberof AdminaddressComponent
   */
  onChange = (_: any) => {};
  /**
   *
   *
   * @memberof AdminaddressComponent
   */
  onTouch = () => {};
  /**
   *
   *
   * @param {*} value
   * @memberof AdminaddressComponent
   */
  writeValue(value: any): void {
    if (value) {
      if (value.length > 0) {
      }
    } else {
      this.addressAdmin = new AddressAdmin();
    }
  }
  /**
   *
   *
   * @param {*} fn
   * @memberof AdminaddressComponent
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  /**
   *
   *
   * @param {*} fn
   * @memberof AdminaddressComponent
   */
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  /**
   *
   *
   * @param {boolean} isDisabled
   * @memberof AdminaddressComponent
   */
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  get addressList(): FormArray {
    return this.addressForm.get('addressList') as FormArray;
  }
  newAddress(): FormGroup {
    return this.fb.group({
      pacaddress: ['', [Validators.required, addressValidator]],
    });
  }
  addpacAddress() {
    this.addressList.push(this.newAddress());
  }
  validHiddencontrol(id: number): boolean {
    return id < 2 ? true : false;
  }

  ngAfterViewChecked() {
    // this.cdRef.detectChanges();
  }
  procesacontrol(event: PacAddress, index: number) {
    // se tiene que recorrer el arreglo de las direcciones
    // registradas.
    this.procesaAddress();
  }
  /**
   *Funcion que se encarga de generar la información del cliente
   *
   * @memberof AdminaddressComponent
   */
  procesaAddress() {
    this.validAddAddress = false;
    let valid: boolean = true;
    this.addressAdmin.Validador = valid;
    this.addressAdmin.PacAddressList = new Array<PacAddress>();
    let origin: PacAddress;
    let contaddc = 0;
    for (let index = 0; index < this.addressForm.value.addressList.length; index++) {
      const item = this.addressForm.value.addressList[index];
      if (item.pacaddress) {
        if (index == 0) {
          origin = ArrayHelper.deepCopy(item.pacaddress);
          origin.type = 'dest';
          item.pacaddress.type = 'ori';
        } else item.pacaddress.type = 'dest';
        const item1 = ArrayHelper.deepCopy(item.pacaddress);
        // valid = !this.addressList.controls[index].get('pacaddress').valid && valid ? false : true;

        valid = !item.pacaddress.valid && valid ? false : true;
        // valid = !this.addressForm.controls.addressList.controls[index].valid && valid ? false : true ;
        this.addressAdmin.PacAddressList.push(item1);
        if (item.pacaddress.valid && (item.pacaddress.id == '1' || item.pacaddress.id == '2')) {
          contaddc++;
        }
      }
    }
    if (contaddc == 2) {
      this.validAddAddress = true;
    }
    if (this.addressForm.value.checkiv && origin != null) {
      this.addressAdmin.PacAddressList.push(origin);
    }
    if (this.addressAdmin.PacAddressList.length > 0) {
      if (this.addressAdmin.PacAddressList.length > 1) {
        this.addressForm.get('checkiv').enable();
      }
      this.addressAdmin.Validador = valid;
      this.onDataChange.emit(this.addressAdmin);
      this.onTouch();
      this.onChange(this.addressAdmin);
    }
  }
  createForm() {
    this.addressForm = this.fb.group({
      addressList: this.fb.array([]),
      checkiv: [{ value: false, disabled: true }],
    });
  }
  onSubmit() {
    console.log(this.addressForm.value);
  }

  // addComponent(componentClass: Type<PacAddressComponent>, hidden: boolean) {
  //   // Create component dynamically inside the ng-template

  //
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);

  //   const component = this.container.createComponent(componentFactory);

  //   component.instance.idclass = (this.components.length + 1).toString();
  //   component.instance.hidden = hidden;
  //   component.instance.onDataChange.subscribe((data: any) => this.procesacontrol(data, 0));
  //   component.instance.deleteAddress.subscribe((id: string) => this.deleteAddress(id));
  //   // component.instance.autodestroy = () => component.destroy();
  //   // Push the component so that we can keep track of which components are created
  //   this.components.push(component);
  // }
  deleteAddress(id: string) {
    // alert("adireccion a eliminar con id :" + id);
    Swal.fire({
      title: this.translateService.instant('Delete Address'),
      text: this.translateService.instant('Are you sure you want to delete the address?'),
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: this.translateService.instant('Yes'),
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
        // const nid: number = Number(id) - 1;
        this.addressList.removeAt(Number(id));
        this.procesaAddress();
      }
    });
  }
  // removeComponent(id: any) {
  //   // Find the component
  //
  //   // const component = this.components.find((component: any) => component.instance instanceof componentClass);
  //   const component = this.components[id];
  //
  //   // component.destroy() ;

  //   const componentIndex = this.components.indexOf(component);

  //   if (componentIndex !== -1) {
  //     // Remove component from both view and array
  //     // const idcon = this.container.indexOf(component);
  //     this.container.remove(id);
  //     this.components.splice(componentIndex, 1);

  //     for (let i = 1; i < this.components.length; i++) {
  //       this.components[i].instance.idclass = i + 1;
  //     }
  //   }
  // }
  changechick(event: any) {
    // this.idayvuelta =  ;
    this.procesaAddress();
  }
}
