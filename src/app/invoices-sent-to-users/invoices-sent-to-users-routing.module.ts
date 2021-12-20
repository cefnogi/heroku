import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesSentToUsersPage } from './invoices-sent-to-users.page';

const routes: Routes = [
  {
    path: '',
    component: InvoicesSentToUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesSentToUsersPageRoutingModule {}
