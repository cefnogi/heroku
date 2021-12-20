import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankListPageRoutingModule } from './bank-list-routing.module';

import { BankListPage } from './bank-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankListPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [BankListPage]
})
export class BankListPageModule {}
