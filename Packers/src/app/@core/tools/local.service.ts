import { Injectable } from '@angular/core';
import { StoragelocalService } from './storagelocal.service';
@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor(private storageService: StoragelocalService) {}
  // Set the json data to local
  setJsonValue(key: string, value: any) {
    this.storageService.secureStorage.setItem(key, value);
  }
  // Get the json value from local
  getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  } // Clear the local
  clearToken() {
    return this.storageService.secureStorage.clear();
  }
  remoteItem(key: string) {
    this.storageService.secureStorage.removeItem(key);
  }
}
