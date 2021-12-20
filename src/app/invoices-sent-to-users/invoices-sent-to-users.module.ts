import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoicesSentToUsersPageRoutingModule } from './invoices-sent-to-users-routing.module';

import { InvoicesSentToUsersPage } from './invoices-sent-to-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoicesSentToUsersPageRoutingModule
  ],
  declarations: [InvoicesSentToUsersPage]
})
export class InvoicesSentToUsersPageModule {}
