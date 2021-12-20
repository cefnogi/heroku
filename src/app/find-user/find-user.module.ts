import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindUserPageRoutingModule } from './find-user-routing.module';

import { FindUserPage } from './find-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindUserPageRoutingModule
  ],
  declarations: [FindUserPage]
})
export class FindUserPageModule {}
