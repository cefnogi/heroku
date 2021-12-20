import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankActivityPage } from './bank-activity.page';

const routes: Routes = [
  {
    path: '',
    component: BankActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankActivityPageRoutingModule {}
