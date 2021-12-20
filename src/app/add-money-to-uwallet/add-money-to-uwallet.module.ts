import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMoneyToUwalletPageRoutingModule } from './add-money-to-uwallet-routing.module';

import { AddMoneyToUwalletPage } from './add-money-to-uwallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMoneyToUwalletPageRoutingModule
  ],
  declarations: [AddMoneyToUwalletPage]
})
export class AddMoneyToUwalletPageModule {}
