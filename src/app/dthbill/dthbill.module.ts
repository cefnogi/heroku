import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DthbillPageRoutingModule } from './dthbill-routing.module';

import { DthbillPage } from './dthbill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DthbillPageRoutingModule
  ],
  declarations: [DthbillPage]
})
export class DthbillPageModule {}
