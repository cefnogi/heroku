import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectedCustomersPage } from './connected-customers.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectedCustomersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectedCustomersPageRoutingModule {}
