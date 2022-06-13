export class PackageType {
  public code: number;
  public name: string;
  public ServiceCode: number;
  public type: string; //BICYCLING OR DRIVING
  public tarifa_ini: number;
  public tarife_sec: number;
  public tarifa_mts: number;
  public distancia_ini: number; //distancia max incluida en tarifa ini
  public recargo_noc: number;
  public recargo_fest: number;
  public image: string;
  public weightLimit: number;
  public sizeLimit: string;
  public distanceLimit: number;
}
