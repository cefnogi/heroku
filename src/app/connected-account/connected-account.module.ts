import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectedAccountPageRoutingModule } from './connected-account-routing.module';

import { ConnectedAccountPage } from './connected-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectedAccountPageRoutingModule
  ],
  declarations: [ConnectedAccountPage]
})
export class ConnectedAccountPageModule {}
