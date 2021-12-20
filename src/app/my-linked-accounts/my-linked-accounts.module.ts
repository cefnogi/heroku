import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyLinkedAccountsPageRoutingModule } from './my-linked-accounts-routing.module';

import { MyLinkedAccountsPage } from './my-linked-accounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyLinkedAccountsPageRoutingModule
  ],
  declarations: [MyLinkedAccountsPage]
})
export class MyLinkedAccountsPageModule {}
