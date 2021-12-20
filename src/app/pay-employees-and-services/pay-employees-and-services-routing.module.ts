import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayEmployeesAndServicesPage } from './pay-employees-and-services.page';

const routes: Routes = [
  {
    path: '',
    component: PayEmployeesAndServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayEmployeesAndServicesPageRoutingModule {}
