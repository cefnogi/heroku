import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { RaiseInvoicePageRoutingModule } from './raise-invoice-routing.module';

import { RaiseInvoicePage } from './raise-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RaiseInvoicePageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: RaiseInvoicePage,
      }
    ])
  ],
  declarations: [RaiseInvoicePage]
})
export class RaiseInvoicePageModule {}
