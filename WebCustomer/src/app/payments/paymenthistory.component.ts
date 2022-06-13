import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { CredentialsService } from '@app/auth';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Balance, Payment } from '@entities';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import { BillService } from '@app/bill.service';
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as moment from 'moment';

// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-paymenthistory',
  templateUrl: './paymenthistory.component.html',
  styleUrls: ['./paymenthistory.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PaymenthistoryComponent implements AfterViewInit {
  @ViewChild('myDiv') myDiv: ElementRef;
  columnsNameToDisplay = ['Fecha', 'Tipo de Transacción', 'Estado', 'Valor', 'Saldo'];
  dataSource: MatTableDataSource<Balance>; //new BalanceDataSource();
  data1 = new BalanceDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pipe: DatePipe;
  //isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() {
    return this.filterForm.get('fromDate').value;
  }
  get toDate() {
    return this.filterForm.get('toDate').value;
  }

  columnsToDisplay = [
    'Payment_sent_at',
    'transaction',
    'Service_Order',
    'Payment_amount_in_cents',
    'Account_Balance',
    'Details',
  ];
  expandedElement: Balance | null;

  constructor(private credentialsService: CredentialsService) {
    this.dataSource = new MatTableDataSource(data);
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  today = new Date(); // This date will be used for the min date
  //dateFilterFn = (date: Date)=> ![0,6].includes(date.getDay());
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  dateFilterFn() {
    // let bs :BillService = new BillService();
    // let y = bs.GenCufeTrnasmition(bs.FVEE);
    // alert (y );
    /*this.pipe = new DatePipe('en');

    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        return data.Payment_sent_at >= this.fromDate && data.Payment_sent_at <= this.toDate;
      }
      return true;
    };
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getImage() {
    let imgToExport = this.myDiv.nativeElement;
    // let imgToExport = document.getElementById('imgToExport') ;

    let canvas = document.createElement('canvas');
    canvas.width = imgToExport.width;
    canvas.height = imgToExport.height;
    canvas.getContext('2d').drawImage(imgToExport, 0, 0);
    return canvas.toDataURL('image/jpg');
  }
  public genRecepi = (id: string) => {
    const fontDescriptors = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf',
      },
    };
    const CONST_PAYMET: Payment = {
      Payment_Type: 'PSE',
      Payment_Id: 'COLBOG00001',
      Payment_Status: 'AVALAIBLE',
      Payment_Token: '20200809123456',
      Payment_Reference: '0014363816',
      Payment_Feature: 'AC',
      Payment_source_id: 7,
      Payment_Currency: 'COP',
      Payment_Acceptance_Token: 'COLBOGACCPECT001',
      Payment_Cuotas: 1,
      Error_type: 'NONE',
      Error_Reason: 'NO ERROR',
    };
    const documentDefinition = {
      content: [
        {
          columns: [
            {
              image: this.getImage(),
              width: 200,
            },
            [
              {
                text: 'RECIBES',
              },
              {
                text: 'NIT. 000.000.000-0',
              },
              {
                text: 'Dirección: AK 15 No 118 - 45 Of 301',
              },
              {
                text: 'Teléfono: 4790844',
              },
            ],
          ],
        },
        {
          text: 'Usuario: ' + this.username,
          style: 'name',
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', '*', '*', '*'],

            body: [
              ['Fecha', 'Guia', 'Valor', 'Tipo de Transación'],
              [
                'Fecha: ' + this.expandedElement.Payment_sent_at,
                'Guia: ' + this.expandedElement.Service_Order,
                'Valor: ' + this.expandedElement.Payment_amount_in_cents,
                'Tipo de Transcción: ' + this.expandedElement.TypeOfTransaction,
              ],
              [
                /*{
                image: 'src/app/shell/header/assets/Recibes-Logo203x57.jpg',
                width: 35,
                alignment : 'right'
              }*/ 'val1',
                'Val 2',
                'Val 3',
                'Val 4',
              ],
            ],
          },
        },

        {
          text: 'Valor: ' + this.expandedElement.Payment_amount_in_cents,
          style: 'name',
        },
        {
          text: '' + this.expandedElement.Payment_amount_in_cents,
          style: 'name',
        },
        {
          text: this.expandedElement.Service_Order,
        },
        {
          text: 'Valor : ' + this.expandedElement.Payment_amount_in_cents,
        },
        {
          text: 'Tipo de Transacción : ' + this.expandedElement.TypeOfTransaction,
        },
        this.getTransactionInfo(CONST_PAYMET),
        {
          columns: [
            {
              qr:
                'Tipo de transaccion: ' +
                this.expandedElement.TypeOfTransaction +
                ' Valor: ' +
                this.expandedElement.Payment_amount_in_cents +
                ' Fecha: ' +
                this.expandedElement.Payment_sent_at,
              fit: 100,
            },
            {
              qr: 'Hola NONO pelotudo',
            },
          ],
        },
        /*{
          image: 'src/app/shell/header/assets/Recibes-Logo203x57.jpg',
          width: 35,
          alignment : 'right'
        }*/

        /*[


            ],

          ]
        },*/
      ],
    };

    pdfMake.createPdf(documentDefinition, {}, fontDescriptors, pdfFonts.pdfMake.vfs).download();
  };

  getTransactionInfo(pay: Payment) {
    switch (pay.Payment_Type) {
      case 'CASH':
        return {
          style: 'payType',
          table: {
            widths: [200, 'auto', '200'],
            headerRows: 1,
            body: [
              [
                { text: 'Metodo de Pago', style: 'tableHeader,', colspan: 2, aligment: 'center' },
                {},
                { text: '' + pay.Payment_Type, style: 'tableHeader', aligment: 'center' },
              ],
            ],
          },
        };
        break;
      default:
        return {
          style: 'payType',
          table: {
            widths: [200, 'auto', 'auto'],
            headerRows: 1,
            body: [
              [
                { text: 'Metodo de Pago', style: 'tableHeader,', colspan: 2, aligment: 'center' },
                {},
                { text: '' + pay.Payment_Type, style: 'tableHeader', aligment: 'center' },
              ],
            ],
          },
        };

        break;
    }
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.usernamedescrip : null;
  }
  getProfilePicObject() {
    return {
      image: 'assets/Logo-Recibes.png',
      width: 35,
      alignment: 'right',
    };
  }
}

const data: Balance[] = [
  {
    Plan: 1,
    transaction: 'Hydrogen',
    Account_Balance: 1.0079,
    Service_Order: 'H',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('10/9/2020'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 2,
    transaction: 'Helium',
    Account_Balance: 4.0026,
    Service_Order: 'He',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('10/8/2020'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 3,
    transaction: 'Lithium',
    Account_Balance: 6.941,
    Service_Order: 'Li',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('10/7/2020'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 4,
    transaction: 'Beryllium',
    Account_Balance: 9.0122,
    Service_Order: 'Be',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('10/6/2020'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 5,
    transaction: 'Boron',
    Account_Balance: 10.811,
    Service_Order: 'B',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('10/5/2020'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 6,
    transaction: 'Carbon',
    Account_Balance: 12.0107,
    Service_Order: 'C',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('10/4/2020'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 7,
    transaction: 'Nitrogen',
    Account_Balance: 14.0067,
    Service_Order: 'N',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('10/3/2020'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 8,
    transaction: 'Oxygen',
    Account_Balance: 15.9994,
    Service_Order: 'O',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('10/2/2020'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 9,
    transaction: 'Fluorine',
    Account_Balance: 18.9984,
    Service_Order: 'F',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('10/1/2020'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 10,
    transaction: 'Neon',
    Account_Balance: 20.1797,
    Service_Order: 'Ne',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('12/12/2019'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 11,
    transaction: 'Sodium',
    Account_Balance: 22.9897,
    Service_Order: 'Na',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('12/11/2019'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 12,
    transaction: 'Magnesium',
    Account_Balance: 24.305,
    Service_Order: 'Mg',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('12/10/2019'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 13,
    transaction: 'Aluminum',
    Account_Balance: 26.9815,
    Service_Order: 'Al',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('12/9/2019'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 14,
    transaction: 'Silicon',
    Account_Balance: 28.0855,
    Service_Order: 'Si',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('12/8/2019'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 15,
    transaction: 'Phosphorus',
    Account_Balance: 30.9738,
    Service_Order: 'P',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('12/7/2019'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 16,
    transaction: 'Sulfur',
    Account_Balance: 32.065,
    Service_Order: 'S',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('12/6/2019'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 17,
    transaction: 'Chlorine',
    Account_Balance: 35.453,
    Service_Order: 'Cl',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('12/5/2019'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 18,
    transaction: 'Argon',
    Account_Balance: 39.948,
    Service_Order: 'Ar',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('12/12/2019'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 19,
    transaction: 'Potassium',
    Account_Balance: 39.0983,
    Service_Order: 'K',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('12/12/2019'),
    Payment_amount_in_cents: 1000000,
  },
  {
    Plan: 20,
    transaction: 'Calcium',
    Account_Balance: 40.078,
    Service_Order: 'Ca',
    TypeOfTransaction: 1,
    Payment_sent_at: new Date('12/12/2019'),
    Payment_amount_in_cents: 1000000,
  },
];

export class BalanceDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  connect(): Observable<Balance[]> {
    const rows: any = [];
    data.forEach((element) => rows.push(element, { detailRow: true, element }));
    //ELEMENT_DATO.forEach((element) => rows.push(element));
    console.log(rows);
    return of(rows);
  }

  disconnect() {}
}
