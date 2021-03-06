import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferToBankAccountPage } from './transfer-to-bank-account.page';

const routes: Routes = [
  {
    path: '',
    component: TransferToBankAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferToBankAccountPageRoutingModule {}
