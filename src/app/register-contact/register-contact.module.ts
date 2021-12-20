import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterContactPageRoutingModule } from './register-contact-routing.module';

import { RegisterContactPage } from './register-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterContactPageRoutingModule
  ],
  declarations: [RegisterContactPage]
})
export class RegisterContactPageModule {}
