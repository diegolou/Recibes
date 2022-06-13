/**
 *Clase que contiene la información de las tarifas
 *
 * @export
 * @class Rates
 */
export class Rates {
  public cityCode: string;
  public packageCode: string;
  public active: boolean;
  public distanceLimit: number;
  public distance_sec: number;
  public distancia_ini: number;
  public image: string;
  public recargo_fest: number;
  public recargo_noc: number;
  public tarifa_ini: number;
  public tarifa_mts: number;
  public tarife_sec: number;
}
