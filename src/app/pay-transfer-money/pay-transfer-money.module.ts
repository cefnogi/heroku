import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayTransferMoneyPageRoutingModule } from './pay-transfer-money-routing.module';

import { PayTransferMoneyPage } from './pay-transfer-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayTransferMoneyPageRoutingModule
  ],
  declarations: [PayTransferMoneyPage]
})
export class PayTransferMoneyPageModule {}
