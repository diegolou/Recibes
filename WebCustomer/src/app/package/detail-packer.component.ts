import { Component, OnInit, LOCALE_ID, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-detail-packer',
  templateUrl: './detail-packer.component.html',
  styleUrls: ['./detail-packer.component.scss'],
})
export class DetailPackerComponent implements OnInit {
  _packer: any;
  visible: boolean = false;

  @Input() createDate: Date;

  @Input() set PackerInfo(val: any) {
    this._packer = val;
    this.visible = this._packer ? true : false;
  }

  constructor(@Inject(LOCALE_ID) public locale: string) {}

  ngOnInit(): void {}
  /**
   *
   *
   * @param {string} val
   * @return {*}
   * @memberof DetailPackerComponent
   */
  getInfoV(val: string) {
    let rta = '';
    switch (val.toUpperCase()) {
      case 'C':
        rta = 'Carro';
        break;
      case 'B':
        rta = 'Bicicleta';
        break;
      case 'M':
        rta = 'Moto';
        break;
      case 'CM':
        rta = 'Camion';
        break;
      case 'CMA':
        rta = 'Camioneta';
        break;
      default:
        break;
    }
    return rta;
  }
}
