import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankActivityDetailsPage } from './bank-activity-details.page';

const routes: Routes = [
  {
    path: '',
    component: BankActivityDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankActivityDetailsPageRoutingModule {}
