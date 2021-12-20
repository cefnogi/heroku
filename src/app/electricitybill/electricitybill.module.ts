import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectricitybillPageRoutingModule } from './electricitybill-routing.module';

import { ElectricitybillPage } from './electricitybill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectricitybillPageRoutingModule
  ],
  declarations: [ElectricitybillPage]
})
export class ElectricitybillPageModule {}
