import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaiseInvoicePage } from './raise-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: RaiseInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaiseInvoicePageRoutingModule {}
