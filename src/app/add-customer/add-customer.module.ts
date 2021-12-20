import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCustomerPageRoutingModule } from './add-customer-routing.module';

import { AddCustomerPage } from './add-customer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddCustomerPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddCustomerPage,
      }
    ])
  ],
  declarations: [AddCustomerPage]
})
export class AddCustomerPageModule {}
