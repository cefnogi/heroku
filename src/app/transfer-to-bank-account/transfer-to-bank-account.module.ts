import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferToBankAccountPageRoutingModule } from './transfer-to-bank-account-routing.module';

import { TransferToBankAccountPage } from './transfer-to-bank-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferToBankAccountPageRoutingModule
  ],
  declarations: [TransferToBankAccountPage]
})
export class TransferToBankAccountPageModule {}
