import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayEmployeesAndServicesPageRoutingModule } from './pay-employees-and-services-routing.module';

import { PayEmployeesAndServicesPage } from './pay-employees-and-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayEmployeesAndServicesPageRoutingModule
  ],
  declarations: [PayEmployeesAndServicesPage]
})
export class PayEmployeesAndServicesPageModule {}
