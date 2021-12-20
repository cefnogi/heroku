import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectBankModalPageRoutingModule } from './select-bank-modal-routing.module';

import { SelectBankModalPage } from './select-bank-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectBankModalPageRoutingModule
  ],
  declarations: [SelectBankModalPage]
})
export class SelectBankModalPageModule {}
