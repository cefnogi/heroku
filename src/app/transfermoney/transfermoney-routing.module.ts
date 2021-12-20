import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfermoneyPage } from './transfermoney.page';

const routes: Routes = [
  {
    path: '',
    component: TransfermoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransfermoneyPageRoutingModule {}
