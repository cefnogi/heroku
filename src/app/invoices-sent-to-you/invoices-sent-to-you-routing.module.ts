import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesSentToYouPage } from './invoices-sent-to-you.page';

const routes: Routes = [
  {
    path: '',
    component: InvoicesSentToYouPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesSentToYouPageRoutingModule {}
