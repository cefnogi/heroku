import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BroadbandbillPageRoutingModule } from './broadbandbill-routing.module';

import { BroadbandbillPage } from './broadbandbill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BroadbandbillPageRoutingModule
  ],
  declarations: [BroadbandbillPage]
})
export class BroadbandbillPageModule {}
