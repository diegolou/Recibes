export class Payment {
  /** PSE, CREDIT, CASH, NEQUI */
  public Payment_Type: string;
  /** ID token con el que podrás registrar la fuente de pago*/
  public Payment_Id: string;
  /** Estado de la transaccion PENDING, AVAILABLE, VOIDED, DECLINED, ERROR*/
  public Payment_Status: string;
  /** Nombre*/
  public Payment_Token: string;
  /**Caracterisitcas de pago, Actividad o plan */
  public Payment_Feature: string;

  /** Referencia única de pago*/
  public Payment_Reference: string;
  /** ID de la fuente de pago*/
  public Payment_source_id: number;

  /**Tipo de modena COL = 'COP' USA = 'US'  */
  public Payment_Currency: string;

  /** Token de Acceptación*/
  public Payment_Acceptance_Token: string;
  /**cuotas */
  public Payment_Cuotas: number;
  /** error type */
  public Error_type: string;
  /**error Reason */
  public Error_Reason: string;
}
