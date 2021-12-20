import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceDashboardPage } from './invoice-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceDashboardPageRoutingModule {}
