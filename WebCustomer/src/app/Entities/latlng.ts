/**
 *Entidad que tiene información de una coordenada
 *Latitud y Longitud
 * @export
 * @class latlng
 */
export class Latlng {
  constructor(lat: number = 0, lng: number = 0) {
    this._lat = lat;
    this._lng = lng;
  }
  private _lat: number;
  public get lat(): number {
    return this._lat;
  }
  public set lat(v: number) {
    this._lat = v;
  }

  private _lng: number;
  public get lng(): number {
    return this._lng;
  }
  public set lng(v: number) {
    this._lng = v;
  }
}
