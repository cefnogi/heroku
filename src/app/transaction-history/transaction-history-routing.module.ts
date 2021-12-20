import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionHistoryPage } from './transaction-history.page';
import { TransactionFullDetailPage } from './transaction-full-detail/transaction-full-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionHistoryPage
  },
  {
    path: 'transaction-full-detail/:id',
    loadChildren: () => import('./transaction-full-detail/transaction-full-detail.module').then( m => m.TransactionFullDetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionHistoryPageRoutingModule {}
