import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankActivityPageRoutingModule } from './bank-activity-routing.module';

import { BankActivityPage } from './bank-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankActivityPageRoutingModule
  ],
  declarations: [BankActivityPage]
})
export class BankActivityPageModule {}
