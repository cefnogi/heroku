import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionFullDetailPageRoutingModule } from './transaction-full-detail-routing.module';

import { TransactionFullDetailPage } from './transaction-full-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionFullDetailPageRoutingModule
  ],
  declarations: [TransactionFullDetailPage]
})
export class TransactionFullDetailPageModule {}
