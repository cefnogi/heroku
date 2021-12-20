import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectBankModalPage } from './select-bank-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SelectBankModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectBankModalPageRoutingModule {}
