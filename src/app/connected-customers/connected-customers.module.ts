import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectedCustomersPageRoutingModule } from './connected-customers-routing.module';

import { ConnectedCustomersPage } from './connected-customers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectedCustomersPageRoutingModule
  ],
  declarations: [ConnectedCustomersPage]
})
export class ConnectedCustomersPageModule {}
