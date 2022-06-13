import { Payment } from './payment';
import { PacPlanes } from './pac-planes';
export class Balance {
  /** Tipo de Plan  */
  public Plan: number; //tipo real PacPlanes;
  /** Transacción Utilidad */
  public transaction: string; // tipo real Payment;
  /** Saldo */
  public Account_Balance: number;
  /** Orden de Servicio */
  public Service_Order: string;
  /** Tipo de transaccion: Debito o Crédito*/
  public TypeOfTransaction: number;
  /**Fecha y hora de transaccion */
  public Payment_sent_at: Date; // tipo real Date;
  /** Dinero en centavos*/
  public Payment_amount_in_cents: number;
}
