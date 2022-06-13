import { Injectable } from '@angular/core';
import { Latlng, PacAddress } from '@entities';
import { OdistanceService } from './odistance.service';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}
  /**
   *Función que se encarga de traer la localización del usuario.
   *si el usuario no autoriza la ubicación no se podra mostrar la
   *la posición de usuario
   *
   * @return {*}  {Promise<Latlng>}
   * @memberof LocationService
   */
  public getLocation(): Promise<Latlng> {
    return new Promise<Latlng>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(Error('No support for geolocation'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let info = new Latlng();
          info.lat = position.coords.latitude;
          info.lng = position.coords.longitude;
          resolve(info);
        },
        (error) => {
          reject(Error(error.message));
        }
      );
    });
  }

  /**
   *Funcion que se encarga de analizar la información que retorna el control
   *de autocompleted de las direcciones.
   *
   * @param {PacAddress} seladdress
   * @param {*} address
   * @return {*}  {PacAddress}
   * @memberof OdistanceService
   */
  public setInfoPacAddress(seladdress: PacAddress, address: any, classid: string): PacAddress {
    if (seladdress == null) {
      seladdress = new PacAddress();
    }
    seladdress.valid = true;
    seladdress.id = classid;
    seladdress.formattedaddress = address.formatted_address;
    seladdress.lat = address.geometry.location.lat();
    seladdress.lng = address.geometry.location.lng();
    seladdress.adnumber = address.address_components[0].long_name;
    seladdress.address = address.address_components[1].short_name;
    // seladdress.control = address.address_components.length;
    switch (address.address_components.length) {
      case 4:
        seladdress.address = '';
        seladdress.city = address.address_components[1].long_name;
        seladdress.state = address.address_components[2].long_name;
        seladdress.country = address.address_components[3].short_name;
        break;
      case 5:
        seladdress.address = '';
        seladdress.city = address.address_components[1].long_name;
        seladdress.state = address.address_components[2].long_name;
        seladdress.country = address.address_components[3].short_name;
        seladdress.postalcode = address.address_components[4].long_name;
        break;
      case 6:
        seladdress.address = '';
        seladdress.city = address.address_components[3].long_name;
        seladdress.state = address.address_components[3].long_name;
        seladdress.country = address.address_components[4].short_name;
        seladdress.postalcode = address.address_components[5].long_name;
        break;
      case 7:
        seladdress.city = address.address_components[2].long_name;
        seladdress.state = address.address_components[4].long_name;
        seladdress.country = address.address_components[5].short_name;
        seladdress.postalcode = address.address_components[6].long_name;
        break;
      case 8:
        seladdress.city = address.address_components[4].long_name;
        seladdress.state = address.address_components[5].long_name;
        seladdress.country = address.address_components[6].short_name;
        seladdress.postalcode = address.address_components[7].long_name;
        break;
      case 9:
        seladdress.address = address.address_components[2].long_name;
        seladdress.adnumber = address.address_components[1].long_name;
        seladdress.city = address.address_components[5].long_name;
        seladdress.state = address.address_components[6].long_name;
        seladdress.country = address.address_components[7].short_name;
        seladdress.postalcode = address.address_components[8].long_name;
        break;
      default:
        seladdress = new PacAddress();
        seladdress.valid = false;
        break;
    }
    return seladdress;
  }

  public getInfoLocation(lat: number, lng: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let geocoder = new google.maps.Geocoder();
      let latlng = {
        lat: lat,
        lng: lng,
      };
      // let pacaddress : PacAddress = new PacAddress() ;
      geocoder.geocode(
        {
          location: latlng,
        },
        function (results: any, status: any) {
          if (status == google.maps.GeocoderStatus.OK) {
            resolve(results[0]);
          } else {
            reject(Error(status));
          }
        }
      );
    });
  }
}
