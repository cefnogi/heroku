import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BroadbandbillPage } from './broadbandbill.page';

const routes: Routes = [
  {
    path: '',
    component: BroadbandbillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BroadbandbillPageRoutingModule {}
