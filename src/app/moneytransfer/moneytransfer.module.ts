import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoneytransferPageRoutingModule } from './moneytransfer-routing.module';

import { MoneytransferPage } from './moneytransfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoneytransferPageRoutingModule
  ],
  declarations: [MoneytransferPage]
})
export class MoneytransferPageModule {}
