import { Component, OnInit, Input, LOCALE_ID, Inject } from '@angular/core';
import { AddressInfoResponse } from '@entities';
import { String } from 'typescript-string-operations';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';
// import * as FileSaver from "file-saver";

@Component({
  selector: 'app-detail-step',
  templateUrl: './detail-step.component.html',
  styleUrls: ['./detail-step.component.scss'],
})
export class DetailStepComponent implements OnInit {
  _infoControl: AddressInfoResponse;
  _title: string;
  _instructions: string;
  _status: string;
  _imageact: boolean;
  visualDetail: boolean = false;
  public text = `{ "text": "This is text file!中文" }`;
  @Input() createDate: Date;
  @Input() set Title(val: string) {
    if (val) {
      this._title = val;
      this.visualDetail = false;
    }
  }
  @Input() Running: boolean;
  @Input() set DataSource(val: AddressInfoResponse) {
    if (val) {
      this._infoControl = val;
      this._title = String.Format('{0} {1}', this.formatAddress(val.address, val.adnumber), val.details);
      this._instructions = val.instruccions != '' ? val.instruccions : 'Sin Información';
      this.visualDetail = true;
      this._status = val.remarks != '' ? val.remarks : 'Sin Informacion';
      this.createDate = val.executionDate;
      this._imageact = val.urlImage == '' ? true : false;
    }
  }
  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private translateService: TranslateService,
    private _httpClient: HttpClient,
    private _FileSaverService: FileSaverService
  ) {}

  ngOnInit(): void {}
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
  viewimage() {
    Swal.fire({
      // title: 'Sweet!',
      // text: 'Modal with a custom image.',
      imageUrl: this._infoControl.urlImage,
      // imageWidth: 400,
      // imageHeight: 200,
      // confirmButtonText: 'Yes, delete it!',
      // imageAlt: 'Activity',
      customClass: {
        confirmButton: 'saconfirmButton',
      },
      confirmButtonText: this.translateService.instant('Ok'),
      showClass: {
        popup: 'swal2-noanimation',
        backdrop: 'swal2-noanimation',
      },
      hideClass: {
        popup: '',
        backdrop: '',
      },

      // buttonsStyling: false
    });
  }
  downloadImage(type: string, fromRemote: boolean) {
    const fileName = `save.${type}`;
    if (fromRemote) {
      this._httpClient
        .get(this._infoControl.urlImage, {
          observe: 'response',
          responseType: 'blob',
        })
        .subscribe((res) => {
          this._FileSaverService.save(res.body, fileName);
        });
      return;
    }
    const fileType = this._FileSaverService.genType(fileName);
    const txtBlob = new Blob([this.text], { type: fileType });
    this._FileSaverService.save(txtBlob, fileName);
    // FileSaver.saveAs(this._infoControl.urlImage) ;
  }
}
