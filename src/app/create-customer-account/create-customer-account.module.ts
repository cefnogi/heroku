import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCustomerAccountPageRoutingModule } from './create-customer-account-routing.module';

import { CreateCustomerAccountPage } from './create-customer-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateCustomerAccountPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateCustomerAccountPage,
      }
    ])
  ],
  declarations: [CreateCustomerAccountPage]
})
export class CreateCustomerAccountPageModule {}
