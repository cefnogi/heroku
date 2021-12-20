import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GasconnectionbillPage } from './gasconnectionbill.page';

const routes: Routes = [
  {
    path: '',
    component: GasconnectionbillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GasconnectionbillPageRoutingModule {}
