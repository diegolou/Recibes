import { RateInfo } from '@entities';

export class PackageInfo {
  public tp_code: number;
  public tp_name: string;
  public image: string;
  public rateValueByCity: Array<RateInfo>;
}
