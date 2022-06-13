export interface iMediosTransporte {
  code: number;
  name: string;
  ServiceCode: number;
  type: string; //BICYCLING OR DRIVING
  tarifa_ini: number;
  tarife_sec: number;
  tarifa_mts: number;
  distancia_ini: number; //distancia max incluida en tarifa ini
  recargo_noc: number;
  recargo_fest: number;
}
