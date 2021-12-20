import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleInvoicePage } from './single-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: SingleInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleInvoicePageRoutingModule {}
