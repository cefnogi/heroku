import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleTransactionHistoryPageRoutingModule } from './single-transaction-history-routing.module';

import { SingleTransactionHistoryPage } from './single-transaction-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleTransactionHistoryPageRoutingModule
  ],
  declarations: [SingleTransactionHistoryPage]
})
export class SingleTransactionHistoryPageModule {}
