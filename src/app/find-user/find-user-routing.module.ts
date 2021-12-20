import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindUserPage } from './find-user.page';

const routes: Routes = [
  {
    path: '',
    component: FindUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindUserPageRoutingModule {}
