/**
 *
 *
 * @export
 * @enum {number}
 */
export enum AddressType {
  Origin = 'Origin',
  Destination = 'Dest',
}

/**
 *
 *
 * @export
 * @enum {number}
 */
export enum Payment_Type {
  WAMPI = 'WAMPI',
  CREDIT = 'CREDIT',
  CASH = 'CASH',
  DEBIT = 'DEBIT',
  PLAN = 'PLAN',
}
/**
 *
 *
 * @export
 * @enum {number}
 */
export enum Payment_Features {
  Activity = 'AC',
  Plan = 'PL',
}

/**
 *
 *
 * @export
 * @enum {number}
 */
export enum Payment_Status {
  PENDING = 'PE',
  AVAILABLE = 'AV',
  VOIDED = 'VO',
  DECLINED = 'DE',
  ERROR = 'ER',
  APPROVED = 'AP',
}
