import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleInvoicePageRoutingModule } from './single-invoice-routing.module';

import { SingleInvoicePage } from './single-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleInvoicePageRoutingModule
  ],
  declarations: [SingleInvoicePage]
})
export class SingleInvoicePageModule {}
