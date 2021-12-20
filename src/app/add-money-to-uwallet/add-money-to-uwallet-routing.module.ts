import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMoneyToUwalletPage } from './add-money-to-uwallet.page';

const routes: Routes = [
  {
    path: '',
    component: AddMoneyToUwalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMoneyToUwalletPageRoutingModule {}
