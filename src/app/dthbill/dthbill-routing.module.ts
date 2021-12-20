import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DthbillPage } from './dthbill.page';

const routes: Routes = [
  {
    path: '',
    component: DthbillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DthbillPageRoutingModule {}
