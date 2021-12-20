import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DthdashboardPageRoutingModule } from './dthdashboard-routing.module';

import { DthdashboardPage } from './dthdashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DthdashboardPageRoutingModule
  ],
  declarations: [DthdashboardPage]
})
export class DthdashboardPageModule {}
