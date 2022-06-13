import { environment } from '@env/environment';
import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
// import { env } from 'process';

const SecureStorage = require('secure-web-storage');
const SECRET_KEY = environment.cryptoKey; //'Ber1g0';
@Injectable({
  providedIn: 'root',
})
export class StoragelocalService {
  constructor() {}
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key: any) {
      key = CryptoJS.SHA256(key, SECRET_KEY);

      return key.toString();
    },
    encrypt: function encrypt(data: any) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data: any) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    },
    // remoteItem:function remoteItem(key :any )
    // {
    //   debugger ;
    //   key = this.hash(key) ;
    //   this.remoteItem(key) ;
    // }
  });
}
