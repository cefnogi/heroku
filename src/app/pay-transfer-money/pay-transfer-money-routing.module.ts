import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayTransferMoneyPage } from './pay-transfer-money.page';

const routes: Routes = [
  {
    path: '',
    component: PayTransferMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayTransferMoneyPageRoutingModule {}
