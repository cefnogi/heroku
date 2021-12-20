import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewpayeePageRoutingModule } from './newpayee-routing.module';

import { NewpayeePage } from './newpayee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewpayeePageRoutingModule
  ],
  declarations: [NewpayeePage]
})
export class NewpayeePageModule {}
