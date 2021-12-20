import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionsuccessPageRoutingModule } from './transactionsuccess-routing.module';

import { TransactionsuccessPage } from './transactionsuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionsuccessPageRoutingModule
  ],
  declarations: [TransactionsuccessPage]
})
export class TransactionsuccessPageModule {}
