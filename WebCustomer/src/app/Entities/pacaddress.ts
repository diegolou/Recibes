export class PacAddress {
  public valid: boolean;
  public formattedaddress: string;
  public id: string;
  public adnumber: string;
  public address: string;
  public city: string;
  public state: string;
  public country: string;
  public postalcode: string;
  public details: string; //Apt, OF, Bloque, Unidad, etc..
  public Instruccions: string; //instrucciones a seguir
  public lat: number;
  public lng: number;
  public type: string;
  // public control: number; // control para la validación del control pacaddress
}
