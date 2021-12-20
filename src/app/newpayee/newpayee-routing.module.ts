import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewpayeePage } from './newpayee.page';

const routes: Routes = [
  {
    path: '',
    component: NewpayeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewpayeePageRoutingModule {}
