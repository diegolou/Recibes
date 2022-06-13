import { PackerInfo } from './PackerInfo';
export class PackageStatus {
  /** */
  public activityId: string;
  /** */
  public status: string;
  /** */
  public remarks: string;
  /** */
  public createDate: Date;
  /** */
  public packer: PackerInfo;
}
