import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoneytransferPage } from './moneytransfer.page';

const routes: Routes = [
  {
    path: '',
    component: MoneytransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoneytransferPageRoutingModule {}
