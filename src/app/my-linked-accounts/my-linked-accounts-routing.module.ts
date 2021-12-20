import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyLinkedAccountsPage } from './my-linked-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: MyLinkedAccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLinkedAccountsPageRoutingModule {}
