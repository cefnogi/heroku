import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectedAccountPage } from './connected-account.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectedAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectedAccountPageRoutingModule {}
