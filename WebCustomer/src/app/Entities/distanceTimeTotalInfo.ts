import { DistanceTimeInfo } from './distanceTimeInfo';
/**
 * Clase que se encarga de contener la información total
 * distancia y tiempo que de semora un recorrido
 * @export
 * @class DistanceTimeTotalInfo
 */
export class DistanceTimeTotalInfo {
  public totalDistance: number;
  public totalDuration: number;
  public detail: Array<DistanceTimeInfo>;
}
