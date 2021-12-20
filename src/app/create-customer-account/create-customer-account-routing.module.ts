import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCustomerAccountPage } from './create-customer-account.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCustomerAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCustomerAccountPageRoutingModule {}
