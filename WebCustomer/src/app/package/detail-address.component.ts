import { Component, OnInit, LOCALE_ID, Inject, Input } from '@angular/core';
import { AddressInfo } from '@entities';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-detail-address',
  templateUrl: './detail-address.component.html',
  styleUrls: ['./detail-address.component.scss'],
})
export class DetailAddressComponent implements OnInit {
  // fecha: Date;

  _addressInfoList: Array<any> = new Array<any>();

  @Input() set AddressInfoList(val: Array<AddressInfo>) {
    this._addressInfoList = val;
  }
  @Input() createDate: Date;
  constructor(@Inject(LOCALE_ID) public locale: string) {}

  ngOnInit(): void {
    // this.fecha = new Date();
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
  fidayvuelta(id: string, type: string): string {
    let rta = '';
    if (id == '1' && type == 'dest') {
      rta = 'Regreso al punto Inicial';
    }
    return rta;
  }
}
