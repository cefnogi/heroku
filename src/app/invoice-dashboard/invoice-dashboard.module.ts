import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceDashboardPageRoutingModule } from './invoice-dashboard-routing.module';

import { InvoiceDashboardPage } from './invoice-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceDashboardPageRoutingModule
  ],
  declarations: [InvoiceDashboardPage]
})
export class InvoiceDashboardPageModule {}
