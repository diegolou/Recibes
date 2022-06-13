import { AddressInfoResponse } from './AddressInfoResponse';
/**
 *
 *
 * @export
 * @class ActivityDetail
 */
export class ActivityDetail {
  public activityId: string;
  public addressInfoList: Array<AddressInfoResponse>;
  public packer: any;
  public createDate: Date;
  public packerAssigDate: Date;
}
