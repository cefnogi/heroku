import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankActivityDetailsPageRoutingModule } from './bank-activity-details-routing.module';

import { BankActivityDetailsPage } from './bank-activity-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankActivityDetailsPageRoutingModule
  ],
  declarations: [BankActivityDetailsPage]
})
export class BankActivityDetailsPageModule {}
