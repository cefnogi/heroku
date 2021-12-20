import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfermoneyPageRoutingModule } from './transfermoney-routing.module';

import { TransfermoneyPage } from './transfermoney.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfermoneyPageRoutingModule
  ],
  declarations: [TransfermoneyPage]
})
export class TransfermoneyPageModule {}
