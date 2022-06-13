import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymenthistoryComponent } from './paymenthistory.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { PaymentComponent } from './payment.component';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentprocessComponent } from './paymentprocess.component';
import { SharedModule } from '@shared';
import { PaymentresultComponent } from './paymentresult.component';

// import { MatFormFieldModule, MatInputModule } from '@angular/material';
// import { MatTableDataSource } from '@angular/material/table';

@NgModule({
  declarations: [PaymenthistoryComponent, PaymentComponent, PaymentprocessComponent, PaymentresultComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule /*MatTableDataSource*/,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
    TranslateModule,
    SharedModule,
  ],
})
export class PaymentsModule {}
