import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GasconnectionbillPageRoutingModule } from './gasconnectionbill-routing.module';

import { GasconnectionbillPage } from './gasconnectionbill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GasconnectionbillPageRoutingModule
  ],
  declarations: [GasconnectionbillPage]
})
export class GasconnectionbillPageModule {}
