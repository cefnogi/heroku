import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequedepositPageRoutingModule } from './chequedeposit-routing.module';

import { ChequedepositPage } from './chequedeposit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChequedepositPageRoutingModule
  ],
  declarations: [ChequedepositPage]
})
export class ChequedepositPageModule {}
