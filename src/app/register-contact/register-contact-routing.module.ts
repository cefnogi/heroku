import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterContactPage } from './register-contact.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterContactPageRoutingModule {}
