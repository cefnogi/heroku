import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleTransactionHistoryPage } from './single-transaction-history.page';

const routes: Routes = [
  {
    path: '',
    component: SingleTransactionHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleTransactionHistoryPageRoutingModule {}
