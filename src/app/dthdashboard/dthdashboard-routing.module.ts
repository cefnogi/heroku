import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DthdashboardPage } from './dthdashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DthdashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DthdashboardPageRoutingModule {}
