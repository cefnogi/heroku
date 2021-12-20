import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaybillPageRoutingModule } from './paybill-routing.module';

import { PaybillPage } from './paybill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaybillPageRoutingModule
  ],
  declarations: [PaybillPage]
})
export class PaybillPageModule {}
