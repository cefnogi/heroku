import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionFullDetailPage } from './transaction-full-detail.page';


const routes: Routes = [
  {
    path: '',
    component: TransactionFullDetailPage
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionFullDetailPageRoutingModule { }
