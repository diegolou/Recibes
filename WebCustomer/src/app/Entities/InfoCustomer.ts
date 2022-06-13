import { AddressInfoResponse } from '@entities';
export class InfoCustomer {
  public idType: string;
  public idNumber: number;
  public profile: string;
  public customerId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public status: string;
  public mobile: number;
  public retefuente: boolean;
  public actaReteFuente: string;
  public reteIca: boolean;
  public actaReteIca: string;
  public company: boolean;
  public countryCode: number;
  public addressInfoList: Array<AddressInfoResponse>;
}
